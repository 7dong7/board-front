/**
 *  api 요청
 *      api 요청에 대한 정적 설정을 create 로 진행
 *
 *  request 인터셉터
 *      인증이 필요한 요청의 경우 해당 요청을 사용하며
 *      request Header 에 동적으로 access 토큰을 담아서 인증을 요청한다
 *  
 *  response 인터셉터
 *      요청이 access 토큰이 만료된 경우
 *      쿠키의 refresh 토큰을 사용해서 access 토큰을 재발급 요청을 진행
 *      
 *      성공적으로 재발급되면 해당 api 요청을 재요청한다
 */
import axios from "axios";

import { createContext, useContext } from "react";

// api context
const ApiContext = createContext(null);

// api 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // 쿠키, 인증정보 포함 요청
});

// === 인터셉터 ===

// 모든 요청에 대해서 localStorage 에 값을 가져와서 요청 header 에 담아서 보낸다
api.interceptors.request.use( // request 인터셉터
    // config: 요청 설정 객체
    (config) => {
        const access = localStorage.getItem("access");
        if (access) {
            config.headers['Authorization'] = "Bearer "+access;
        }
        return config;
    },
    // error: 요청을 보내기 전에 에러가 발생하면 처리
    (error) => {
        return Promise.reject(error);
    }
)

/**
 *  응답 인터셉터
 *  서버로 부터 응답을 받은 직후, (then, catch) 핸들러가 실행되기 전에 호출된다
 *  응답 데이터를 가공하거나, 에러를 처리할 수 있다
 *
 *  Http 사앹 코드에 따라서 처리를 진행할 수 있다 (access 토큰 만료시 refresh 토큰을 사용하여 access 토큰 재발급)
 */
// 응답 인터셉터 -> 정상인 경우는 그냥 반환, access 토큰의 검증 에러 발생시 처리 로직 구현
api.interceptors.response.use( // response 인터셉터
    (response) => {
        /**
         *  요청에 대한 결과가 정상적으로 이루어진 경우 여기서 추가 처리를 진행한다
         *  응답에 대한 추가적인 전처리 과정
         *  
         *  현재는 그냥 response 그대로 반환
         */
        return response;
    },
    async (error) => { // 서버에 대한 요청이 필요하기 때문에 async 사용
        /**
         *  요청이 에러가 발생하면 여기서 요청에 대한 처리를 진행하면 된다
         *
         *  async 이유: 인터셉터 내에서 비동기 작업을 수행할 수 있도록 하기 위함
         *      async 를 비동기 함수로 동작시키며, 내부에서 await 를 사용할 수 있다
         *
         *  async - 함수가 비동기적으로 동작한다는 것을 병시, 자동으로 promise 객체를 반환
         *      함수 내부에서 비동기 처리없는 경우라면
         *
         *  단, axios 요청의 catch 의 처리보다 먼저 동작하기 때문에 응답 인터셉터에서 에러를 처리한 직후에
         *      Promise.reject(error)를 반환하지 않는 경우에는, axios 의 catch(error) 처리 블록이 동작하지 않을 수 있다
         *      따라서 catch 블록의 동작을 원하는 경우 return Promise.reject(error); 을 작성해 주어야 한다
         */
        // console.log("error.response.status: ", error.response.status); // 오류 상태 번호
        // console.log("error.response.error", error.response.data.error); // 오류 메시지
        // console.log("error.config._retry: ", error.config._retry); // retry

        if( // 조건에 맞으면 요청
            String(error.response.status) === '401' &&
            error.response.data.error === 'access token expired' &&
            !error.config._retry
        ) {
            error.config._retry = true; // 무한 루프 방지
            try { // access token expired: access 토큰 재발급 처리 로직
                const response = await axios({
                    url: 'http://localhost:8080/api/refresh',
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true, // 쿠키, 인증정보 포함해서 요청
                });
                console.log("response: ", response);
                const access = response.headers['access'];
                localStorage.setItem("access", access);
                return api(error.config); // access 토큰을 재발급 받았으니 다시 요청을 진행한다
            } catch (refreshError) {
                /**
                 *  리프레시 토큰 자체에 문제가 있는경우 여기로 온다
                 *      이런 경우는 다시 로그인을 시키도록 하자
                 */
                console.log("refreshError: ", refreshError);
                alert("세션이 만료되었습니다. 다시 로그인해주세요.")
                window.location.href = "/login"; // 로그인 페이지로 이동
                return Promise.reject(error);
            }
        } // if (access 토큰 재발급 처리)
        return Promise.reject(error); // axios 에서 catch(error) 블록 실행 여부를 결정한다고 보면됨
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



