// css
import "./PostItem.css"
// 포맷 라이브러리
import { format } from "date-fns"; // 날짜 변경

// 훅
import {useNavigate} from "react-router-dom";

const PostItem = ({ postId, title, viewCount, nickname, createdAt, style, memberId}) => {
    const nav = useNavigate();

    const navPost = () => {
        nav(`/posts/${postId}`)
    }


    // == 이벤트 == //
    const onRedirectMember = () => {
        nav(`/members/${memberId}`);
    }

    return (
        <div className={`PostItem PostItem-${style}`}>
            <div>{postId}</div>
            <div className={"PostItem-title-nav"} onClick={navPost}>{title}</div>
            <div>{viewCount}</div>
            <div onClick={onRedirectMember}>
                {nickname}
            </div>
            <div> {format(new Date(createdAt), 'yyyy-MM-dd HH:mm')} </div>
        </div>
    )
}

export default PostItem;