// css
import "./PostContent.css";

// format
import {format} from "date-fns";


const PostContent = ({postId, title, content, createdAt, viewCount, memberId, nickname}) => {
/**
 *  postId: 게시글 번호
 *  title: 제목
 *  content: 내용
 *  createdAt: 작성일
 *  viewCount: 조회수
 *  memberId: 작성자 id
 *  nickname: 작성자 닉네임
 */
    return (
        <div className={"PostContent"}>
            <div className={"postInfo"}>
                <div className={"postInfo-titleInfo"}>
                    <span className={"postInfo-titleInfo-title"}>[카테고리]{title}</span>
                    <span className={"postInfo-titleInfo-viewCount"}>[{viewCount}]</span>
                </div>
                <div className={"postInfo-member"}>
                    <span className={"postInfo-member-nickname"}>작성자: {nickname}</span>
                    <span className={"postInfo-member-createAt"}>
                        작성일: {createdAt ? format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss') : "로딩중..."}
                    </span>
                </div>
            </div>

            <div
                className={"postContent"}
                dangerouslySetInnerHTML={{__html:content}}>
            </div>
        </div>
    );
}

export default PostContent;