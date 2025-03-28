// css
import "./CreateComment.css";

// 컴포넌트
import Header from "./Header.jsx";
import {useState} from "react";
import {useApi} from "../../api/ApiContext.jsx";
import {useParams} from "react-router-dom";

const CreateComment = () => {
    const [comment, setComment] = useState(); // 댓글 내용
    const {id} = useParams();
    const api = useApi();

// ==== 이벤트 ====
    // 댓글내용 변경 이벤트
    const onChangeComment = (e) => {
        setComment(e.target.value);
    }

    // 댓글작성 이벤트
    const createCommentHandler = async () => {
        console.log("댓글작성하기 이벤트 발생");
        console.log("id:",id);
        try {
            const response = await api({
                method: "POST",
                url: "/api/comments/new",
                data: {
                    postId: id,
                    comment: comment,
                }
            });
            window.location.href = `/posts/${id}`; // 댓글 작성후 새로고침
        } catch (error) {
            console.error("error:", error);
        }
    };

    return (
        <div className={"CreateComment"}>
            <Header size={"h3"} title={"댓글 작성"} loc={"left"} color={"basic"}/>

            <div className={"create-comment-content"}>
                <textarea
                    value={comment}
                    onChange={onChangeComment}
                    className={"create-comment-textarea"}
                    placeholder={"댓글을 작성하세요"}
                    required />

                <button
                    className={"btn-comment create-comment-btn"}
                    onClick={createCommentHandler}>
                    댓글작성
                </button>
            </div>
        </div>
    );
}

export default CreateComment;