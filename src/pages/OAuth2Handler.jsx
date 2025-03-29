import {usePublicApi} from "../api/PublicApi.jsx";
import {useEffect} from "react";

const OAuth2Handler = () => {
    console.log("localStorage에 값 저장 처리 경로")

    const publicApi = usePublicApi(); // api 요청

    useEffect( () => {
        // api 요청 함수
        const requestApi = async () => {
            try {
                const response = await publicApi({
                    method: "GET",
                    url: "/api/OAuth2/handler",
                    withCredentials: true,
                });
                const access = response.headers['access'];
                const username = response.headers['username'];
                console.log("access:", access);
                console.log("username:", username);

                localStorage.setItem("access", access);
                localStorage.setItem("username", username);
            } catch (error) {
                console.log("error:", error);
            }
        }
        requestApi(); // 호출
        window.location.href = "/"; // 경로 이동
    }, []);

    return (
        <div>작업중...</div>
    );
}

export default OAuth2Handler;