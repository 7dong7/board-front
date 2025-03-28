import './App.css'

// layout 컴포넌트
import TopNavigationBar from "./components/layout/TopNavigationBar.jsx";

// 페이지
import Login from "./pages/Login.jsx"; // 로그인 페이지
import Posts from "./pages/Posts.jsx"; // 게시글 목록
import PostDetail from "./pages/PostDetail.jsx"; // 게시글 내용
import PostNew from "./pages/PostNew.jsx";
import PostEdit from "./pages/PostEdit.jsx";

// 경로 설정
    // 조건부 로케이션
import {Routes, Route, useLocation} from "react-router-dom";

// api 제공
import {ApiProvider} from "./api/ApiContext.jsx";

// 테스트 컴포넌트
import {PublicApiProvider} from "./api/PublicApi.jsx";
import {RefreshProvider} from "./api/RefreshContext.jsx";



function App() {
    // Header 조건부 렌더링
    const location = useLocation();
    const hideHeader = location.pathname === "/login";

    return (
        <>
            <ApiProvider> {/* 인증이 필요한 요청에 사용 */}
            <RefreshProvider>{/* api 요청 이후 refresh 토큰을 사용해 다시 access 토큰을 요청하기 위해서 사용 */}
            <PublicApiProvider> {/* 인증이 필요하지 않은 요청에 사용 */}
                {!hideHeader && <TopNavigationBar/>}

                <Routes>{/* 경로 설정 */}
                    <Route path={"/"} element={<Posts/>}/>
                    <Route path={"/posts"} element={<Posts/>}/> {/* 게시글 목록*/}
                    <Route path={"/posts/:id"} element={<PostDetail />} />  {/* 게시글 내용 */}
                    <Route path={"/posts/new"} element={<PostNew />} /> {/* 게시글 작성 */}

                    <Route path={"/posts/:postId/edit"} element={<PostEdit />}/> {/* 게시글 수정*/}
                    <Route path={"/login"} element={<Login/>}/> {/* 로그인 페이지*/}
                </Routes>
            </PublicApiProvider>
            </RefreshProvider>
            </ApiProvider>
        </>
    );
}

export default App
