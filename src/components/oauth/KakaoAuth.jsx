// css
import "./KakaoAuth.css";

// 이미지
import {GetLoginImage} from "../../util/get-login-image.js";

const KakaoAuth = () => {

    return (
        <button className={"KakaoAuth"}>
            <div className={"kakao-image"}>
                <img className={"kakao-image-img"}
                    src={GetLoginImage("kakao")}
                />
            </div>
        </button>
    );
}

export default KakaoAuth;