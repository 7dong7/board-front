// css
import './GoogleAuth.css'

// 이미지
import { GetLoginImage } from "../../util/get-login-image.js";
import {usePublicApi} from "../../api/PublicApi.jsx";

const GoogleAuth = () => {
    const publicApi = usePublicApi(); // api 요청

    // OAuth2 사용 google 요청
    const googleLoginHandler = () => {
        console.log("googleLoginHandler 발생");
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

    return (
        <button
            onClick={googleLoginHandler}
            className={"GoogleAuth"}>
            <div className={"google-image"}>
                <img
                    className={"google-image-img"}
                    src={GetLoginImage("google")}/>
                <span
                    className={"google-image-name"}>
                    구글 로그인
                </span>
            </div>
        </button>
    );
}

export default GoogleAuth;