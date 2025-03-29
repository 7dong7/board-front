// css
import './GoogleAuth.css'

// 이미지
import { GetLoginImage } from "../../util/get-login-image.js";

const GoogleAuth = () => {

    const googleLoginHandler = () => {
        console.log("googleLoginHandler 발생");
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