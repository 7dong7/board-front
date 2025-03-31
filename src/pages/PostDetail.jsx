// css
import "./PostDetail.css";

// 컴포넌트
import Line from "../components/common/Line.jsx";
import NavButton from "../components/common/NavButton.jsx";
import Header from "../components/common/Header.jsx";
import PostContent from "../components/common/PostContent.jsx";
import Comment from "../components/common/Comment.jsx";
import Paging from "../components/common/Paging.jsx";
import CreateComment from "../components/common/CreateComment.jsx";

// 훅
import {useParams, useSearchParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode"; // jwt 해석

// 포맷 훅
import comment from "../components/common/Comment.jsx";

const PostDetail = () => {
    const auth = useAuth(); // 로그인 상태
    const {id} = useParams(); // 동적 경로 매핑
    const publicApi = usePublicApi(); // api 요청
    const [searchParams, setSearchParams] = useSearchParams() // url 검색어
    const [post, setPost] = useState(); // 게시글 상태
    const [replyTo, setReplyTo] = useState(); // 대댓글의 부모 댓글 번호
    const [commentPage, setCommentPage] = useState(); // 댓글 페이징
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
            setCommentPage(response.data.viewComment); // comment 페이지 저장
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

    // 페이징바 설정 // 페이지 객체를 설정으로 넣어주면 된다
    const renderPageNumbers = (page) => { // 페이징 렌더링을 기준점이 필요함
        if (page) {
            const renderNumbers = 7; // 렌더링할 페이징 수 => 1,2,3,4,5,6,7
            const startPage = Math.max(1,
                parseInt(page.number+1) - Math.floor(renderNumbers / 2) > page.totalPages - renderNumbers
                    ? parseInt(page.totalPages) - renderNumbers + 1
                    : parseInt(page.number + 1) - Math.floor(renderNumbers / 2)
            ); // 페이징바의 시작 페이지번호
            const endPage = Math.min(page.totalPages + 1, startPage + renderNumbers); // 페이징바의 마지막 페이지 번호
            return Array.from({length: endPage - startPage}, (_, i) => startPage + i);
        }
    }
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

    const commentNumbers = renderPageNumbers(commentPage);

    return (
        <div className={"PostDetail"}>
            <section className={"header-section"}>
                <Header size={"h1"} title={"게시글"} loc={"center"} color={"basic"}/>
            </section>
            
            {/* 댓글 내용 부분*/}
            <section className={"post-content-section"}>
                <PostContent {...post}/>
                {post.email === jwtDecode(localStorage.getItem("access")).username && (
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
                        <Comment key={item.commentId} comment={item} replyTo={replyTo} setReplyTo={setReplyTo}/>
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
                        pageNumbers={commentNumbers}
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