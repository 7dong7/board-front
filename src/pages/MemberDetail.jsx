// css
import "./MemberDetail.css";

// 훅
import {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";

// 컴포넌트
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";
import MemberInfo from "../components/common/MemberInfo.jsx";
import MemberPosts from "../components/common/MemberPosts.jsx";
import MemberComments from "../components/common/MemberComments.jsx";
import Paging from "../components/common/Paging.jsx";
import NavButton from "../components/common/NavButton.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {jwtDecode} from "jwt-decode";

const MemberDetail = () => {
    const auth = useAuth();
    const {id} = useParams(); // 사용자 번호
    const publicApi = usePublicApi(); // api 요청 (공용)
    const [member, setMember] = useState(); // 정보
    const [searchParams, setSearchParams] = useSearchParams(); // url 검색 조건
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const nav = useNavigate();

// ===== 이벤트 ===== //
    const getMemberDetail = async () => { // 사용자 정보 조회
        try {
            const response = await publicApi({
                method: "GET",
                url: `/api/members/${id}`,
                params : {
                    postPageNumber: searchParams.get("postPageNumber") || "1",
                    postSort: searchParams.get("postSort") || "id",
                    postDirection: searchParams.get("postDirection") || "DESC",
                    commentPageNumber: searchParams.get("commentPageNumber") || "1",
                    commentSort: searchParams.get("commentSort") || "id",
                    commentDirection: searchParams.get("commentDirection") || "DESC"
                }
            });
            setSearchParams({
                postPageNumber: searchParams.get("postPageNumber") || "1",
                postSort: searchParams.get("postSort") || "id",
                postDirection: searchParams.get("postDirection") || "DESC",
                commentPageNumber: searchParams.get("commentPageNumber") || "1",
                commentSort: searchParams.get("commentSort") || "id",
                commentDirection: searchParams.get("commentDirection") || "DESC"
            });
            setMember(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error("error:", error);
            nav("/NotFoundMember", {replace: true});
        }
    }

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
    const postHandlePageChange = (newPage) => {
        if(newPage >= 1 && newPage < member.pagePost.totalPages + 1) { // page 범위 지정 (실제 사용하는 범위를 벗어나지 못함)
            setSearchParams({
                postPageNumber: newPage,
                postSort: searchParams.get("postSort") || "id",
                postDirection: searchParams.get("postDirection") || "DESC",
                commentPageNumber: searchParams.get("commentPageNumber") || "1",
                commentSort: searchParams.get("commentSort") || "id",
                commentDirection: searchParams.get("commentDirection") || "DESC"
            });
        }
    };

    // 페이지 이동 ( 페이지 네비게이션을 사용하는 이동 )
    const commentHandlePageChange = (newPage) => {
        if(newPage >= 1 && newPage < member.pageComment.totalPages + 1) { // page 범위 지정 (실제 사용하는 범위를 벗어나지 못함)
            setSearchParams({
                postPageNumber: searchParams.get("postPageNumber") || "id",
                postSort: searchParams.get("postSort") || "id",
                postDirection: searchParams.get("postDirection") || "DESC",
                commentPageNumber: newPage,
                commentSort: searchParams.get("commentSort") || "id",
                commentDirection: searchParams.get("commentDirection") || "DESC"
            });
        }
    };

    // useEffect
    useEffect(() => {
        getMemberDetail();
    }, [searchParams]);

// 로딩중
    if (isLoading) {
        return (
            <div>로딩중...</div>
        );
    }
    // 게시글 페이징
    const postNumbers = renderPageNumbers(member.pagePost); // 페이지를 넣어주면 된다
    // 댓글 페이징
    const commentNumbers = renderPageNumbers(member.pageComment); // 페이지를 넣어주면 된다

    // "정보수정" 버튼 렌더링 조건
    const editCondition =
        auth.isLogged && // 로그인 여부 true => 로그인
        localStorage.getItem("access") && // 로그인 되어있고 jwt 값이 있음
        String(id) === String(jwtDecode(localStorage.getItem("access")).id);

    return (
        <div className={"MemberDetail"}>
            <section className={"MemberDetail-header-section"}>
                <Header
                    title={"사용자 정보"}
                    size={"h2"}
                    color={"basic"}/>
                {
                    editCondition &&
                    <NavButton className={"MemberDetail-edit"}
                               navPath={`/members/${id}/verify-password`}
                               text={"정보 수정"}/>
                }
            </section>
            <Line/>

            <section className={"MemberDetail-member-section"}>
                <MemberInfo member={member}/>
            </section>

            <section className={"MemberDetail-posts-section"}>
                <Header title={"작성 게시글 목록"} size={"h3"} color={"basic"}/>
                {   // 작성한 게시글이 있는 없는 경우 true 있는 경우 false
                    member.pagePost.empty
                        ?
                        <div className={"MemberDetail-posts-empty"}>작성한 게시글이 없습니다</div>
                        :
                        <div>
                            <MemberPosts pagePost={member.pagePost}/>
                            <Paging
                                pageNumbers={postNumbers}
                                handlePageChange={postHandlePageChange}
                                page={member.pagePost}/>
                        </div>
                }
            </section>

            <section className={"MemberDetail-comments-section"}>
                <Header title={"작성 댓글 목록"} size={"h3"} color={"basic"}/>
                {   // 작성한 댓글이 없는 경우
                    member.pageComment.empty
                        ?
                        <div className={"MemberDetail-posts-empty"}>작성한 댓글이 없습니다</div>
                        :
                        <div>
                            <MemberComments pageComment={member.pageComment}/>
                            <Paging
                                pageNumbers={commentNumbers}
                                handlePageChange={commentHandlePageChange}
                                page={member.pageComment}/>
                        </div>
                }
            </section>
        </div>
    );
}

export default MemberDetail;