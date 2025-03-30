// css
import "./MemberDetail.css";

// 훅
import {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";

// 컴포넌트
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";
import MemberInfo from "../components/common/MemberInfo.jsx";
import MemberPosts from "../components/common/MemberPosts.jsx";
import MemberComments from "../components/common/MemberComments.jsx";

const MemberDetail = () => {
    const {id} = useParams(); // 사용자 번호
    const publicApi = usePublicApi(); // api 요청 (공용)
    const [member, setMember] = useState(); // 정보
    const [searchParams, setSearchParams] = useSearchParams(); // url 검색 조건
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태


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
            console.log("response:", response);
            setMember(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("error:", error);
        }
    }



// useEffect
    useEffect(() => {
        getMemberDetail();
    }, []);

// 로딩중
    if (isLoading) {
        return (
            <div>로딩중...</div>
        );
    }

    return (
        <div className={"MemberDetail"}>
            <section className={"MemberDetail-header-section"}>
                <Header
                    title={"사용자 정보"}
                    size={"h2"}
                    color={"basic"}/>
                <button>정보 수정</button>
            </section>
            <Line/>

            <section className={"MemberDetail-member-section"}>
                <MemberInfo member={member}/>
            </section>


            <section className={"MemberDetail-posts-section"}>
                <Header title={"작성 게시글 목록"} size={"h3"} color={"basic"}/>
                <MemberPosts pagePost={member.pagePost} />
            </section>


            <section className={"MemberDetail-comments-section"}>
                <Header title={"작성 댓글 목록"} size={"h3"} color={"basic"}/>
                <MemberComments pageComment={member.pageComment} />
            </section>
        </div>
    );
}

export default MemberDetail;