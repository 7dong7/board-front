// css
import "./TopNavigationBar.css";

// 네비게이션 버튼
import NavButton from "../common/NavButton.jsx";
import NavReloadButton from "../common/NavReloadButton.jsx";


const TopNavigationBar = () => {

    return (
        <div className={"TopNavigationBar"}>
            <div className={"nav-bar-left"}>
                <NavReloadButton text={"게시글 목록"} navPath={"/posts"}/>
            </div>

            <div className={"nav-bar-right"}>
                <NavButton text={"로그인"} navPath={"/login"}/>
            </div>
        </div>
    );
}

export default TopNavigationBar;