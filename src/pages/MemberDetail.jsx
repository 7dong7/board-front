// css
import "./MemberDetail.css";

// 훅
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";

// 컴포넌트
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";
import MemberInfo from "../components/common/MemberInfo.jsx";

const MemberDetail = () => {
    const {id} = useParams(); // 사용자 번호
    const publicApi = usePublicApi(); // api 요청 (공용)
    const [member, setMember] = useState();
    const [isLoading, setIsLoading] = useState(true);


    // ===== 이벤트 ===== //
    const getMemberDetail = async () => { // 사용자 정보 조회
        try {
            const response = await publicApi({
                method: "GET",
                url: `/api/members/${id}`
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

            <Line />
            
            <section className={"MemberDetail-posts-section"}>
                <Header title={"작성 게시글 목록"} size={"h3"}/>
                사용자 게시글 목록
            </section>

            <Line />

            <section className={"MemberDetail-posts-section"}>
                <Header title={"작성 댓글 목록"} size={"h3"}/>
                사용자 댓글 목록
            </section>
        </div>
    );
}

export default MemberDetail;