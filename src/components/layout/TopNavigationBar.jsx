
// 네비게이션
import { useNavigate } from "react-router-dom";


const TopNavigationBar = () => {
    const nav = useNavigate(); // 네비게이션
    
    
    const navLogin = () => {
        nav("/login");
    }

    return (
        <div>
            <button onClick={navLogin}>로그인</button>
        </div>
    );
}

export default TopNavigationBar;