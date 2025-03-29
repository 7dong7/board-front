// css
import "./KakaoAuth.css";

// 이미지
import {GetLoginImage} from "../../util/get-login-image.js";

const KakaoAuth = () => {
    // 카카오 로그인 핸들러
    const kakaoLoginHandler = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
    }

    return (
        <button
            onClick={kakaoLoginHandler}
            className={"KakaoAuth"}>
            <div className={"kakao-image"}>
                <img className={"kakao-image-img"}
                    src={GetLoginImage("kakao")}
                />
            </div>
        </button>
    );
}

export default KakaoAuth;