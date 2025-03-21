// css
import "./TopNavigationBar.css";


// 네비게이션
import { useNavigate } from "react-router-dom";


const TopNavigationBar = () => {
    const nav = useNavigate(); // 네비게이션
    
    const navLogin = () => {
        nav("/login"); // 로그인 버튼 클릭시 로그인 페이지로 이동
    }

    const navBoard = () => {
        nav("/boardList");
    }

    return (
        <div className={"TopNavigationBar"}>
            <div className={"nav-bar-left"}>
                <button onClick={navBoard}>게시글 목록</button>
            </div>

            <div className={"nav-bar-right"}>
                <button onClick={navLogin}>로그인</button>
            </div>
        </div>
    );
}

export default TopNavigationBar;