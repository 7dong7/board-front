// css
import "./CommentItem.css";

// 포맷
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

const CommentItem = ({author, commentId, content, createdAt, postId}) => {
    const nav = useNavigate();

    const navPath = () => {
        nav(`/posts/${postId}`);
    }

    return (
        <div className={`CommentItem`}>
            <div>{commentId}</div>
            <div className={"CommentItem-title-nav"} onClick={navPath}>{content}</div>
            <div>{author}</div>
            <div> {format(new Date(createdAt), 'yyyy-MM-dd HH:mm')} </div>
        </div>
    );
}

export default CommentItem;