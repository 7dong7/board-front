import './App.css'

// layout 컴포넌트
import TopNavigationBar from "./components/layout/TopNavigationBar.jsx";

// 페이지
import Notfound from "./pages/errors/Notfound.jsx"; // 에러 페이지: 잘못된 경로, 잘못된 요청
import NotfoundMember from "./pages/errors/NotfoundMember.jsx"; // 존재하지 않는 회원, 탈퇴한 회원 조회

import Login from "./pages/Login.jsx"; // 로그인 페이지
import Posts from "./pages/Posts.jsx"; // 게시글 목록
import PostDetail from "./pages/PostDetail.jsx"; // 게시글 내용
import PostNew from "./pages/PostNew.jsx"; // 게시글 작성
import PostEdit from "./pages/PostEdit.jsx"; // 게시글 수정
import MemberDetail from "./pages/MemberDetail.jsx"; // 사용자 정보
import MemberVerify from "./pages/MemberVerify.jsx"; // 사용자 정보 수정 시 비밀번호를 확인하는 페이지
import MemberEdit from "./pages/MemberEdit.jsx"; // 사용자의 정보를 수정하는 페이지
import MemberNew from "./pages/MemberNew.jsx";

// OAuth2 정리
import OAuth2Handler from "./components/oauth/OAuth2Handler.jsx";

// 경로 설정
    // 조건부 로케이션
import {Routes, Route, Outlet} from "react-router-dom";

// api 제공
import {ApiProvider} from "./api/ApiContext.jsx";
import {PublicApiProvider} from "./api/PublicApi.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/oauth/ProtectedRoute.jsx";

// 헤더가 있는 레이아웃
function MainLayout() {
    return (
        <>
            <TopNavigationBar />
            <Outlet /> {/* 자식 컴포넌트 여기에 렌더링 */}
        </>
    );
}

// 헤더가 없는 레이아웃
function NoHeaderLayout() {
    return <Outlet />
}

function App() {
    return (
        <>
            <ApiProvider> {/* 인증이 필요한 요청에 사용 */}
            <PublicApiProvider> {/* 인증이 필요하지 않은 요청에 사용 */}
            <AuthProvider> {/* 로그인 상태 관리 */}
                <Routes>
                    <Route element={<NoHeaderLayout />}> {/* 헤더 네비게이션바가 없는 페이지 */}
                        <Route path={"/login"} element={<Login />}/> {/* 로그인 페이지*/}
                        <Route path={"/oauth2/setting/handler"} element={<OAuth2Handler />} /> {/* OAuth2 로그인 처리 */}
                        <Route path={"*"} element={<Notfound />}/> {/* 정의되지 않은 경로 */}
                        <Route path={"/NotFoundMember"} element={<NotfoundMember />}/> {/* 이동시킬 경로*/}
                    </Route>

                    <Route element={<MainLayout />}> {/* 헤더 네비게이션바가 있는 페이지 */}
                        <Route path={"/"} element={<Posts/>}/>
                        <Route path={"/posts"} element={<Posts/>}/> {/* 게시글 목록 페이지*/}
                        <Route path={"/posts/:id"} element={<PostDetail />} />  {/* 게시글 내용 페이지*/}
                        <Route path={"/posts/new"} element={<PostNew />} /> {/* 게시글 작성 페이지 */}
                        <Route path={"/posts/:postId/edit"} element={<PostEdit />}/> {/* 게시글 수정 페이지 */}

                        <Route path={"/members"} element={<MemberNew />}/> {/* 사용자 새로 가입 */}
                        <Route path={"/members/:id"} element={<MemberDetail />}/> {/* 사용자 정보 보기 */}
                        <Route path={"/members/:id/verify-password"}
                               element={<ProtectedRoute element={<MemberVerify />}/>}
                        /> {/* 사용자의 정보를 수정하기 위한 비밀번호 확인 검증 */}
                        <Route path={"/members/:id/edit"}
                               element={<ProtectedRoute element={<MemberEdit />} requiredVerificationPassword />}
                        /> {/* 비밀번호 확인이후 접근가능한 사용자 정보 수정 페이지 */}
                    </Route>
                </Routes>
            </AuthProvider>
            </PublicApiProvider>
            </ApiProvider>
        </>
    );
}

export default App
