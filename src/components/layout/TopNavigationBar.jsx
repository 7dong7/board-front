// css
import "./TopNavigationBar.css";

// 네비게이션 버튼
import NavButton from "../common/NavButton.jsx";
import NavReloadButton from "../common/NavReloadButton.jsx";
import {useEffect, useState} from "react";

// 훅

const TopNavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
    const [username, setUsername] = useState(""); // 로그인 사용자 username

    useEffect(() => { // Header 에 로그인 사용자 표시
        const access = localStorage.getItem("access");
        if (access) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem("username"));
        }
    }, []);

    return (
        <div className={"TopNavigationBar"}>
            <div className={"nav-bar-left"}>
                <NavReloadButton text={"게시글 목록"} navPath={"/posts"}/>
            </div>

            <div className={"nav-bar-right"}>
                {
                    isLoggedIn
                        ?
                        <div>
                            <button>{username}</button>
                            <button>로그아웃</button>
                        </div>
                        :
                        <NavButton text={"로그인"} navPath={"/login"}/>
                }
            </div>
        </div>
    );
}

export default TopNavigationBar;