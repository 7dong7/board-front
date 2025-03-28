// css
import "./CreateComment.css";

// 컴포넌트
import Header from "./Header.jsx";

const CreateComment = () => {

    const createCommentHandler = () => {
        console.log("댓글작성하기 이벤트 발생");
    };

    return (
        <div className={"CreateComment"}>
            <Header size={"h3"} title={"댓글 작성"} loc={"left"} color={"basic"}/>

            <div className={"create-comment-content"}>
                <textarea
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