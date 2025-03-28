import {createContext, useContext, useState} from "react";

// 로그인 context 생성
const AuthContext = createContext();

// AuthProvider 생성
export const AuthProvider = ({children}) => {
    // 초기 로그인 상태 설정
    const [isLogged, setIsLogged] = useState(!!localStorage.getItem("username"))

    // 로그인 상태

    
    // 로그아웃 상태
    
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
};


// useAuth 훅
export const useAuth = () => useContext(AuthContext);
