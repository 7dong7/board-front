// css
import "./NavButton.css";

const NavReloadButton = ({className, text, navPath}) => {

    const navEvent = () => {
        window.location.href = navPath;
    }

    return (
        <button
            onClick={navEvent}
            className={`${className}`}>
            {text}
        </button>
    )
}

export default NavReloadButton;