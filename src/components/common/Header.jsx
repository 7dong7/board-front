// css
import "./Header.css";

const Header = ({title, loc}) => {

    return (
      <div className={`Header Header-${loc}`}>
          <h1>{title}</h1>
      </div>
    );
}

export default Header;