// css
import "./NavButton.css";
// 네비게이션
import {useNavigate} from "react-router-dom";

const NavButton = ({className, text, navPath}) => {
    const nav = useNavigate();

    const navEvent = () => {
        nav(navPath);
    }

    return (
        <button
            onClick={navEvent}
            className={`NavButton ${className}`}>
            {text}
        </button>
    )
}

export default NavButton;