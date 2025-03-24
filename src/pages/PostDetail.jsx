// css
import "./PostDetail.css";

// 게시글 내용
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";
import PostContent from "../components/common/PostContent.jsx";

// 훅
import {useParams} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";
import {useEffect, useState} from "react";

// 포맷 훅
import { format } from "date-fns";

const PostDetail = () => {
    const {id} = useParams(); // 동적 경로 매핑
    const publicApi = usePublicApi(); // api 요청
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);

    const postDetail = async () => {
        setLoading(true);
        try {
            const response = await publicApi({
                url: `/api/posts/${id}`,
                method: "GET",
            });
            /**
             *  1. 게시글에 대한 정보
             *  2. 게시글에 대한 댓글
             *  3. 댓글에 대한 대댓글
             */
            console.log("postDetail response.data: ", response.data);
            setPost(response.data);
        } catch (error) {
            console.log("error: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        postDetail();
    }, []);

    if (loading) {
        return <div>로딩중...</div>
    }

    return (
        <div className={"PostDetail"}>
            <section className={"header-section"}>
                <Header size={"h1"} title={"게시글"} loc={"center"} color={"basic"}/>
            </section>

            <section className={"post-content-section"}>
                <PostContent {...post}/>
            </section>

            <Line />
            <section className={"comments-section"}>
                <Header size={"h2"} title={"댓글"} loc={"left"} color={"basic"}/>
            </section>
        </div>
    );
}

export default PostDetail;