// css
import "./Comment.css";

// 컴포넌트
import Replies from "./Replies.jsx";
import CreateReply from "./CreateReply.jsx";
import CreateComment from "./CreateComment.jsx";


// 날짜 형식
import {format} from "date-fns";
import {useAuth} from "../../contexts/AuthContext.jsx";

const Comment = ({comment ,replyTo, setReplyTo}) => {
    const auth = useAuth(); // 로그인 상태

// === 이벤트 === //
    const showReplyForm = () => {
        setReplyTo(comment.commentId);
    }

    return (
        <div className={"Comment"}>
            <div className={"comment-info"}>
                <span className={"comment-author"}>{comment.author}</span>
                <span className={"comment-createAt"}>
                    {
                        auth.isLogged &&
                        <button onClick={showReplyForm}
                                className={"comment-view-btn"}>
                            댓글작성
                        </button>
                    }
                    {comment.createdAt ? format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss') : "로딩중..."}
                </span>
            </div>
            <div className={"comment-content"}>{comment.content}</div>
            {comment.replies.length === 0
                ? null
                : comment.replies.map((reply) =>
                    <Replies key={reply.commentId} reply={reply}/>
                )
            }
            {/* 로그인 여부 & 대댓글 작성 폼과 state 가 같은 경우만 보임*/}
            {  
                auth.isLogged && String(comment.commentId) === String(replyTo)
                    ? <CreateReply parentId={comment.commentId} >대댓글 작성폼</CreateReply>
                    : null
            }
        </div>
    );
}

export default Comment;