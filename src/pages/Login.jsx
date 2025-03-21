// css
import "./Login.css";

// 컴포넌트
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";

// api context
import { useApi } from "../api/ApiContext.jsx";


// 경로
import { Link } from "react-router-dom";
import {useState} from "react";

const Login = () => {
    const api = useApi(); // api 불러오기
    // 로그인의 경우 state vs ref 에 대해서 state 가 상태를 실시간으로 보고 수정 가능함 (입력 상태 감지)
    const [form, setForm] = useState({
        username: "",
        password: "",
    }); // login state

    // 로그인 state 변경 이벤트
    const onChangeLoginForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    
    // 로그인 핸들러 api 요청
    const loginEvent = async () => {
        try {
            const response = await api({
                method: "POST",
                url: "/login",
                data: {
                    username:String(form.username),
                    password:String(form.password)
                }
            });
            const access = response.headers['access'];
            if (access) { // 정상적으로 access 토큰 값을 받아온 경우 로컬 스토리지에 저장한다
                localStorage.setItem("access", access);
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };
    

    return (
        <div className={"Login"}>
            <Header title={"로그인"} loc={"center"}/>

            <Line/>

            <div className={"loginForm"}>
                <label>아이디</label>
                <input name={"username"}
                       className={"username"}
                       type={"text"}
                       placeholder={"아이디를 입력하세요"}
                       value={form.username}
                       onChange={onChangeLoginForm} />

                <label>비밀번호</label>
                <input name={"password"}
                       type={"password"}
                       className={"password"}
                       placeholder={"비밀번호를 입력하세요"}
                       value={form.password}
                       onChange={onChangeLoginForm} />
            </div>

            {/*<Link />*/}

            <button
                className={"login-btn"} onClick={loginEvent}>
                로그인
            </button>

            <Line/>


            <div className={"OAuth2-login"}>
                외부 로그인
            </div>
        </div>
    );
}

export default Login;