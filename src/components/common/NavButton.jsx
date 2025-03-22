// css
import "./NavButton.css";
// 네비
import {useNavigate} from "react-router-dom";

const NavButton = ({className, text, navPath}) => {
    const nav = useNavigate();

    const navEvent = () => {
        nav(navPath);
    }

    return (
        <button
            onClick={navEvent}
            className={`${className}`}>
            {text}
        </button>
    )
}

export default NavButton;