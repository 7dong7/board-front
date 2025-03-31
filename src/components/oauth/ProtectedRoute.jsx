// 컴포넌트
import {useAuth} from "../../contexts/AuthContext.jsx";

// 훅
import {Navigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

/**
 *  ==== Protected Route 컴포넌트 ====
 *  element
 *      보호하려는 페이지 컴포넌트
 *  
 *  isAuthenticated
 *      인증상태트를 확인하려는 로직 true, false
 *  
 *  Navigate
 *      인증 실패시 리디렉션할 곳
 *      
 *  App 에서 requiredVerificationPassword 를 속성으로 넣어주면 true가 되고 requiredVerificationPassword 값을 넣어주지 않으면 false 값이 나온다
 */
const ProtectedRoute = ({element, requiredVerificationPassword = false}) => {
    const {isLogged, verifyPassword} = useAuth(); // 로그인 상태
    const {id} = useParams();

    // 로그인 상태 확인
    if (!isLogged) { // 로그인 페이지 리디렉션
        return <Navigate to={"/login"} replace={true}/>
    }
    // 수정자의 정보인지 확인 (다른 사용자의 정보는 수정할 수 없음)
    if ( String(id) !== String(jwtDecode(localStorage.getItem("access")).id) ) { // 게시글 목록으로 리디렉션
        return <Navigate to={"/posts"} replace={true}/>
    }
    // 비밀번호의 확인이 필요한 경우
    if ( requiredVerificationPassword && !verifyPassword ) { // 비밀번호의 확인이 필요한 경우 verifyPassword 가 false 이면 /posts 로 리디렉션
        return <Navigate to={'/posts'} replace={true} />
    }

    return element;
};

export default ProtectedRoute;