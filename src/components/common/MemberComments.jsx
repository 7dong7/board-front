// css
import "./MemberComments.css";

// 컴포넌트
import CommentItem from "./CommentItem.jsx";

const MemberComments = ({pageComment}) => {

    return (
        <div className={"MemberComments"}>
            <div className={"MemberComments-column-name"}>
                <div>글 번호</div>
                <div>내용</div>
                <div>작성자</div>
                <div>작성일</div>
            </div>
            <div className={"MemberComments-column-value"}>
                {
                    pageComment.content.map(
                        (item) => <CommentItem key={item.commentId} {...item}/>
                    )
                }
            </div>
        </div>
    );
}

export default MemberComments;