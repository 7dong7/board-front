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
import {PublicApiProvider} from "./api/PublicApi.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

// 로그인 전역 관리 context


function App() {


    // Header 조건부 렌더링
    const location = useLocation();
    const hideHeader = location.pathname === "/login";

    return (
        <>
            <ApiProvider> {/* 인증이 필요한 요청에 사용 */}
            <PublicApiProvider> {/* 인증이 필요하지 않은 요청에 사용 */}
            <AuthProvider> {/* 로그인 상태 관리 */}
                {!hideHeader && <TopNavigationBar />}

                <Routes>{/* 경로 설정 */}
                    <Route path={"/"} element={<Posts/>}/>
                    <Route path={"/posts"} element={<Posts/>}/> {/* 게시글 목록*/}
                    <Route path={"/posts/:id"} element={<PostDetail />} />  {/* 게시글 내용 */}
                    <Route path={"/posts/new"} element={<PostNew />} /> {/* 게시글 작성 */}
                    <Route path={"/posts/:postId/edit"} element={<PostEdit />}/> {/* 게시글 수정*/}

                    <Route path={"/login"} element={<Login />}/> {/* 로그인 페이지*/}
                </Routes>
            </AuthProvider>
            </PublicApiProvider>
            </ApiProvider>
        </>
    );
}

export default App
