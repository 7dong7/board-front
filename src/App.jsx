import './App.css'

// layout 컴포넌트
import TopNavigationBar from "./components/layout/TopNavigationBar.jsx";

// 페이지
import BoardList from "./pages/BoardList.jsx";
import Login from "./pages/Login.jsx";

// 경로 설정
    // 조건부 로케이션
import {Routes, Route, useLocation} from "react-router-dom";

// api 제공
import {ApiProvider} from "./api/ApiContext.jsx";

// 테스트 컴포넌트
import TestComponent from "./components/TestComponent.jsx";
import {PublicApiProvider} from "./api/PublicApi.jsx";



function App() {
    // Header 조건부 렌더링
    const location = useLocation();
    const hideHeader = location.pathname === "/login";

    return (
        <>
            <ApiProvider>
            <PublicApiProvider>
                {!hideHeader && <TopNavigationBar/>}

                <Routes>{/* 경로 설정 */}
                    <Route path={"/"} element={<BoardList/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </PublicApiProvider>
            </ApiProvider>
        </>
    );
}

export default App
