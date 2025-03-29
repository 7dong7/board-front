// css
import "./TopNavigationBar.css";

// 네비게이션 버튼
import NavButton from "../common/NavButton.jsx";
import NavReloadButton from "../common/NavReloadButton.jsx";
import {useEffect, useState} from "react";
import {usePublicApi} from "../../api/PublicApi.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";

// 훅

const TopNavigationBar = () => {
    const auth = useAuth(); // 로그인 상태 Context
    const [username, setUsername] = useState(""); // 로그인 사용자 username
    const publicApi = usePublicApi();

    useEffect(() => { // Header 에 로그인 사용자 표시
        const access = localStorage.getItem("access");
        if (access) {
            auth.setIsLogged(true);
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    // 로그아웃 이벤트
    const logoutHandler = async () => {
        console.log("로그아웃 실행");
        try {
            const response = await publicApi({
                url: "/logout",
                method: "GET",
                withCredentials: true,
            });
            localStorage.removeItem("access");
            localStorage.removeItem("username");
            auth.setIsLogged(false);
            setUsername("");
            window.location.href = '/';
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <div className={"TopNavigationBar"}>
            <div className={"nav-bar-left"}>
                <NavReloadButton text={"게시글 목록"} navPath={"/posts"}/>
            </div>

            <div className={"nav-bar-right"}>
                {
                    auth.isLogged
                        ?
                        <div>
                            <button>{username}</button>
                            <button onClick={logoutHandler}>로그아웃</button>
                        </div>
                        :
                        <NavButton text={"로그인"} navPath={"/login"}/>
                }
            </div>
        </div>
    );
}

export default TopNavigationBar;