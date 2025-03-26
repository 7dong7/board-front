// css
import "./Comment.css";

// 컴포넌트
import Replies from "./Replies.jsx";

// 날짜 형식
import {format} from "date-fns";

const Comment = ({comment}) => {
    console.log("comment: ", comment);

    console.log(comment.replies.length)
    if (comment.replies.length === 0) {
        console.log("리플 없음");
    }

    return (
        <div className={"Comment"}>
            <div className={"comment-info"}>
                <span className={"comment-author"}>{comment.author}</span>
                <span className={"comment-createAt"}>
                    {comment.createdAt ? format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss') : "로딩중..."}
                </span>
            </div>
            <div className={"comment-content"}>{comment.content}</div>
            {comment.replies.length === 0
                ? null
                : comment.replies.map((reply) =>
                    <Replies reply={reply}/>
                )
            }

        </div>
    );
}

export default Comment;