// css
import "./MemberPosts.css";

// 컴포넌트
import PostItem from "./PostItem.jsx";
import Header from "./Header.jsx";

const MemberPosts = ({pagePost}) => {

    console.log("pagePost:", pagePost);
    return (
        <div className={"MemberPosts"}>
            <div className={"MemberPosts-column-name"}>
                <div>글 번호</div>
                <div>제목</div>
                <div>조회수</div>
                <div>작성자</div>
                <div>작성일</div>
            </div>
            <div className={"MemberPosts-column-value"}>
                {
                    pagePost.content.map(
                        (item) => <PostItem key={item.postId} {...item} style={"members"}/>
                    )
                }
            </div>
        </div>
    );
}

export default MemberPosts;