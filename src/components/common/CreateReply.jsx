// css
import "./CreateReply.css";

// 컴포넌트
import Header from "./Header.jsx";

// 훅
import {useState} from "react";
import {useApi} from "../../api/ApiContext.jsx";
import {useParams} from "react-router-dom";

const CreateReply = ({parentId}) => {
    const [reply, setReply] = useState(); // 리플 내용
    const {id} = useParams();
    const api = useApi(); // api

// === 이벤트 === //
    // 대댓글 내용 작성
    const onChangeReply = (e) => {
        setReply(e.target.value);
    };
    // 댓글작성 이벤트
    const createReplyHandler = async () => {
        try {
            const response = await api({
                method: "POST",
                url: "/api/replies/new",
                data: {
                    postId: id,
                    comment: reply,
                    parentId: parentId,
                }
            });
            window.location.href = `/posts/${id}`; // 댓글 작성후 새로고침
        } catch (error) {
            console.error("error:", error);
        }
    };

    return (
        <div className={"CreateReply"}>
            <Header size={"h4"} title={"댓글 작성"} loc={"left"} color={"basic"}/>

            <div className={"create-reply-content"}>
                <textarea
                    value={reply}
                    onChange={onChangeReply}
                    className={"create-reply-textarea"}
                    placeholder={"댓글을 작성하세요"}
                    required/>

                <button
                    onClick={createReplyHandler}
                    className={"create-reply-btn"}>
                    댓글작성
                </button>
            </div>
        </div>
    );
}

export default CreateReply;