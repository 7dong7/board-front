// css
import "./Header.css";

const Header = ({size, title, loc, color}) => {
    const sizes = ['h1', 'h2', 'h3'];
    const TitleSize = sizes.includes(size) ? size : 'h1';

    return (
        <div className={`Header Header-${loc} color-${color}`}>
            <TitleSize>{title}</TitleSize>
        </div>
    );
}

export default Header;