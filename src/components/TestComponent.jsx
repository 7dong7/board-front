import {useApi} from "../api/ApiContext.jsx";


const TestComponent = () => {
    const api = useApi(); // api Context 에서 기본 설정 가져오기

    const submitHandler = async () => {
        try {
            const response = await api({
                url: "/api/test",
                method: "GET"
            });
            console.log(response.data);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <div>
            <button onClick={submitHandler}>
                서버로 테스트 요청 보내기 jwt 확인
            </button>
        </div>
    );
}

export default TestComponent