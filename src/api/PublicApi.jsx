// === 일반적인 api 요청 === //
import axios from "axios";
import {createContext, useContext} from "react";

// api context
const PublicApiContext = createContext(null);

// api 설정
const publicApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
});

// api 제공 컴포넌트
export function PublicApiProvider({children}) {
    return <PublicApiContext.Provider value={publicApi}>{children}</PublicApiContext.Provider>
}

// api Context 호출 메소드
export function usePublicApi() {
    const publicApi= useContext(PublicApiContext);
    if (!publicApi) throw new Error('usePublicApi 는 PublicApiProvider 안에서 사용해야 합니다');
    return publicApi;
}