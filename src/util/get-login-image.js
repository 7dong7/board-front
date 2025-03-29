import googleLogin from './../assets/images/googleLogo.png'
import naverLogin from '../assets/images/naverLogo.png'
import kakaoLogin from '../assets/images/kakaoLogin.png'

export function GetLoginImage(image) {
    switch (image) {
        case 'google': return googleLogin;
        case 'naver': return naverLogin;
        case 'kakao': return kakaoLogin;
        default: return null;
    }
}