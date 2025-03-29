// css
import './GoogleAuth.css'

// 이미지
import { GetLoginImage } from "../../util/get-login-image.js";

const GoogleAuth = () => {
    // OAuth2 사용 google 요청
    const googleLoginHandler = () => {
        /**
         *  스프링 시큐리티에서 OAuth2 클라이언트 및 로그인 기능을 활성화의 기능을 활성화하면
         *      /oauth2/authorization/{registrationId} 에 해당하는 엔드포인트는 (yml 혹은 properties 에 설정된)
         *      OAuth2AuthorizationRequestRedirectFilter 를 사용해 자동으로 감지한다
         *          따라서 SecurityFilterChain 에 명시적으로 등록하지 않아도 내부적으로 알아서 처리해 준다
         *          모든 접근 허용(permitAll)
         *          
         *      명시적으로 /oauth2/authorization/google 경로를 denyAll() 처리를 하지 않는 이상은 자동으로 처리해준다
         *      denyAll() 처리시 접근 불가
         *
         *  OAuth2 사용 방법
         *      - api 신청
         *      - yml 설정
         *      - spring security  oauth2Login 활성화
         */
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