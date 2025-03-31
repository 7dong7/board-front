// 훅
import {createContext, useContext, useState} from "react";


// 로그인 context 생성
const AuthContext = createContext();

// AuthProvider 생성
export const AuthProvider = ({children}) => {
    // 초기 로그인 상태 설정
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("access")); // 로그인 상태 전역 관리
    const [verifyPassword, setVerifyPassword] = useState(!!localStorage.getItem("verifyPassword")); // 사용자 정보 수정 권한 전역 관리

    return (
        <AuthContext.Provider value={{isLogged, setIsLogged, verifyPassword, setVerifyPassword}}>
            {children}
        </AuthContext.Provider>
    )
};

// useAuth 훅
export const useAuth = () => useContext(AuthContext);
