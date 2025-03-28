// === access 만료된 경우 refresh 토큰을 이용한 access 토큰 재발급 === //
import axios from "axios";

import { createContext, useContext } from "react";

// api context
const RefreshContext = createContext(null);

// api 생성
const refreshApi = axios.create({
    baseURL: 'http://localhost:8080/api/refresh',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true, // 쿠키, 인증정보 포함 요청
    method: "POST",
});

// api 제공 컴포넌트
export function RefreshProvider({children}) { // children 은 api 를 제공받는 하위 컴포넌트
    return <RefreshContext.Provider value={refreshApi}>{children}</RefreshContext.Provider>
}

// context 를 사용해서 요청에 대한 관리를 context 를 통해서
export function useRefrshApi() {
    const api = useContext(RefreshContext); // ApiContext 를 호출한다 // return pai
    if (!api) throw new Error('useRefrshApi는 RefreshProvider 안에서 사용해야 합니다');
    return api;
}