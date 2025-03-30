// css
import "./CommentItem.css";

// 포맷
import {format} from "date-fns";

const CommentItem = ({author, commentId, content, createdAt, postId}) => {
    /**
     * author : "박동빈"
     * commentId : 202
     * content : "12314"
     * createdAt : "2025-03-30T00:34:19.85037"
     * postId : 108
     */

    return (
        <div className={`CommentItem`}>
            <div>{commentId}</div>
            <div className={"PostItem-title-nav"}>{content}</div>
            <div>{author}</div>
            <div> {format(new Date(createdAt), 'yyyy-MM-dd HH:mm')} </div>
        </div>
    );
}

export default CommentItem;