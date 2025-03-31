import './App.css'

// layout 컴포넌트
import TopNavigationBar from "./components/layout/TopNavigationBar.jsx";

// 페이지
import Login from "./pages/Login.jsx"; // 로그인 페이지
import Posts from "./pages/Posts.jsx"; // 게시글 목록
import PostDetail from "./pages/PostDetail.jsx"; // 게시글 내용
import PostNew from "./pages/PostNew.jsx"; // 게시글 작성
import PostEdit from "./pages/PostEdit.jsx"; // 게시글 수정
import MemberDetail from "./pages/MemberDetail.jsx"; // 사용자 정보
import MemberVerify from "./pages/MemberVerify.jsx"; // 사용자 정보 수정 시 비밀번호를 확인하는 페이지
import MemberEdit from "./pages/MemberEdit.jsx"; // 사용자의 정보를 수정하는 페이지

// OAuth2 정리
import OAuth2Handler from "./components/oauth/OAuth2Handler.jsx";

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
                    <Route path={"/oauth2/setting/handler"} element={<OAuth2Handler />} /> {/* OAuth2 로그인 처리 */}

                    <Route path={"/members/:id"} element={<MemberDetail />}/>
                    <Route path={"/members/:id/verify-password"} element={<MemberVerify />}/>
                    <Route path={"/members/:id/edit"} element={<MemberEdit />}/>
                </Routes>
            </AuthProvider>
            </PublicApiProvider>
            </ApiProvider>
        </>
    );
}

export default App
