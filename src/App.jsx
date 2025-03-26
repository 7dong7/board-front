import './App.css'

// layout 컴포넌트
import TopNavigationBar from "./components/layout/TopNavigationBar.jsx";

// 페이지
import Login from "./pages/Login.jsx"; // 로그인 페이지
import Posts from "./pages/Posts.jsx"; // 게시글 목록
import PostDetail from "./pages/PostDetail.jsx"; // 게시글 내용
import PostNew from "./pages/PostNew.jsx";

// 경로 설정
    // 조건부 로케이션
import {Routes, Route, useLocation} from "react-router-dom";

// api 제공
import {ApiProvider} from "./api/ApiContext.jsx";

// 테스트 컴포넌트
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
                    <Route path={"/"} element={<Posts/>}/>
                    <Route path={"/posts"} element={<Posts/>}/>
                    <Route path={"/posts/:id"} element={<PostDetail />} />
                    <Route path={"/posts/new"} element={<PostNew />} />
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </PublicApiProvider>
            </ApiProvider>
        </>
    );
}

export default App
