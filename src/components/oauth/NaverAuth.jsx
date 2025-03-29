// css
import './NaverAuth.css';

// 이미지
import { GetLoginImage } from "../../util/get-login-image.js";

const NaverAuth = () => {

    const naverLoginHandler = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/naver";
    }

    return (
        <button
            onClick={naverLoginHandler}
            className={"NaverAuth"}>
            <div className={"naver-image"}>
                <img
                    className={"naver-image-img"}
                    src={GetLoginImage("naver")}
                />
                <span className={"naver-image-name"}>
                    네이버 로그인
                </span>
            </div>
        </button>
    );
}

export default NaverAuth;