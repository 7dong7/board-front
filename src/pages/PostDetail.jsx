// css
import "./PostDetail.css";

// 컴포넌트
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";
import PostContent from "../components/common/PostContent.jsx";
import Comment from "../components/common/Comment.jsx";
import Paging from "../components/common/Paging.jsx";
import CreateComment from "../components/common/CreateComment.jsx";

// 훅
import {useParams, useSearchParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";
import {useEffect, useState} from "react";

// 포맷 훅
import comment from "../components/common/Comment.jsx";
import NavButton from "../components/common/NavButton.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";

const PostDetail = () => {
    const auth = useAuth(); // 로그인 상태
    const {id} = useParams(); // 동적 경로 매핑
    const publicApi = usePublicApi(); // api 요청
    const [searchParams, setSearchParams] = useSearchParams() // url 검색어
    const [post, setPost] = useState(); // 게시글 상태
    const [commentPage, setCommentPage] = useState({ // 댓글 상태
        content: [],
        totalPages: 0,
        currentPage: parseInt(searchParams.get('page') || 1, 10)
    });
    const [loading, setLoading] = useState(true); // 로딩 상태

    const postDetail = async () => {
        setLoading(true);
        try {
            const response = await publicApi({
                url: `/api/posts/${id}`,
                method: "GET",
                params: {
                    page: searchParams.get("page")
                }
            });
            /**
             *  1. 게시글에 대한 정보
             *  2. 게시글에 대한 댓글
             *  3. 댓글에 대한 대댓글
             */
            // console.log("postDetail response.data: ", response.data);
            setPost(response.data); // post 저장
            setCommentPage({ // commentPage 저장
                content: response.data.viewComment.content,
                totalPages: response.data.viewComment.totalPages,
                currentPage: searchParams.get("page") || 1,
            });
        } catch (error) {
            console.log("error: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        postDetail();
    }, [searchParams]);

    // ======== 페이징 처리 ========
    const getPageNumbers = () => {
        const {currentPage, totalPages} = commentPage;
        // console.log(`currentPage: {${currentPage}}, totalPages: {${totalPages}}`);
        const startPage = Math.max(1, currentPage - 4); // 최소 페이지,현재 페이지 기준 왼쪽으로 3개 표시
        const endPage = Math.min(currentPage + 4, totalPages); // 현재 페이지 오른쪽 3개, 최대 페이지
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    }
    const pageNumbers = getPageNumbers(); // 페이징 번호 반복수

    // 페이지 이동 ( 페이지 네비게이션을 사용하는 이동 )
    const handlePageChange = (newPage) => {
        if(newPage >= 1 && newPage < commentPage.totalPages + 1) { // page 범위 지정 (실제 사용하는 범위를 벗어나지 못함)
            setSearchParams({
                page: newPage,
            });
        }
    };

    if (loading) { // 렌더링 이후에
        return <div>로딩중...</div>
    }

    const username = localStorage.getItem("username");

    return (
        <div className={"PostDetail"}>
            <section className={"header-section"}>
                <Header size={"h1"} title={"게시글"} loc={"center"} color={"basic"}/>
            </section>
            
            {/* 댓글 내용 부분*/}
            <section className={"post-content-section"}>
                <PostContent {...post}/>
                {post.email === username && (
                    <NavButton text={"수정하기"} navPath={`/posts/${id}/edit`} className={"post-edit-btn"}/>
                )}
            </section>

            <Line/>
            <section className={"postDetail-comment-header-section"}>
                <Header size={"h2"} title={"댓글"} loc={"left"} color={"basic"}/>
            </section>

            <section className={"comments-section"}>
                {
                    commentPage.content.map((item) =>
                        <Comment key={item.commentId} comment={item}/>
                    )
                }
            </section>

            <section className={"paging-nav"}>
                {commentPage.content.length === 0 ?
                    <div className={"no-comment"}>
                        작성된 댓글이 없습니다.
                        <br />
                        댓글은 로그인 후 작성할 수 있습니다.
                    </div>
                    :
                    <Paging
                        page={commentPage}
                        pageNumbers={pageNumbers}
                        handlePageChange={handlePageChange}
                    />
                }
            </section>

            <section className={"comment-write-section"}>
                {/* 로그인을 해야 댓글표시*/}
                {auth.isLogged && <CreateComment />}
            </section>
        </div>
    );
}

export default PostDetail;