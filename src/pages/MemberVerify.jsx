// css
import "./MemberVerify.css";

// 컴포넌트
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";

// 훅
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Navigate, useNavigate, useParams} from "react-router-dom"; // 페이지 이동
import {jwtDecode} from "jwt-decode";
import {useApi} from "../api/ApiContext.jsx"; // jwt 해석


/**
 *  == 훅 설명 ==
 *  useNavigate
 *      함수형 컨포넌트 내에서 프로그래밍 방식으로 라우팅(페이지 이동)을 수행하는 방식
 *      반환값은 함수
 *
 *      nav('/about', { replace: true }); // 경로 이동후 히스토리에 추가하지 않음 (뒤로가기 막음)
 *      nav(-1) 뒤로 가기
 *      nav(1) 앞으로 가기
 *
 *  Navigate
 *      선언적으로 경로를 이동시키는 데 사용
 *      이 컴포넌트가 렌더링 되면 "즉시" 지정된 경로로 리다이렉트한다
 *      
 *      <Navigate to="/login" replace /> // to: 이동할 경로, replace 히스토리 관리
 */

/**
 *  === 로직 순서 ===
 *  로그인 여부, 로그인한 이후 보인 정보 수정 확인
 */
const MemberVerify = () => {
    const {id} = useParams();
    const [password, setPassword] = useState(); // 비밀번호 확인시 보낼 password 값
    const auth = useAuth();
    const nav = useNavigate();
    const api = useApi();

    // 비밀번호 입력 이벤트
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const verifyApi = async () => {
        try {
            const response = await api({
                method: "POST",
                url: `/api/auth/verify-password`,
                data: {
                    memberId: id,
                    password:password
                },
            });
            if (response.status === 200) {
                localStorage.setItem("verifyPassword", true);
                auth.setVerifyPassword(true);
                nav(`/members/${id}/edit`);
            }
        } catch (error) {
            console.log("error:", error);
        }finally {
            setPassword("");
        }
    }

    // 확인 클릭
    const verifyApiRequest = () => {
        verifyApi()
    };
    const onEnter = (e) => { // enter 이벤트
        if (e.keyCode === 13) {
            verifyApiRequest();
        }
    }

    return (
        <div className={"MemberVerify"}>
            <Header title={"사용자 정보 수정"} size={"h2"}/>
            <Line />

            <section className={"MemberVerify-password-section"}>
                <label>비밀번호 확인</label>
                <input
                    value={password}
                    onKeyDown={onEnter}
                    onChange={onChangePassword}
                    type="password"
                    className={"MemberVerify-password"}
                    placeholder={"비밀번호"}/>
                <button onClick={verifyApiRequest}
                    className={"MemberVerify-btn"}>
                    확인
                </button>
            </section>
        </div>
    )
}
export default MemberVerify;