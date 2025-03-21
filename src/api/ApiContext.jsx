import axios from "axios";

import { createContext, useContext } from "react";

// api context
const ApiContext = createContext(null);

// api 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, // 쿠키, 인증정보 포함 요청
});

// 인터셉터
    // 모든 요청에 대해서 localStorage 에 값을 가져와서 요청 header 에 담아서 보낸다
api.interceptors.request.use(
    (config) => { // config 는 요청 객체
        const access = localStorage.getItem("access");
        if (access) {
            config.headers['Authorization'] = "Bearer "+access;
        }
        return config;
    },
    (error) => { // 요청 실패시
        return Promise.reject(error);
    }
)

// api 제공 컴포넌트
export function ApiProvider({children}) { // children 은 api 를 제공받는 하위 컴포넌트
    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

// context 를 사용해서 요청에 대한 관리를 context 를 통해서
export function useApi() {
    const api = useContext(ApiContext); // ApiContext 를 호출한다 // return pai
    if (!api) throw new Error('useApi는 ApiProvider 안에서 사용해야 합니다');
    return api;
}



