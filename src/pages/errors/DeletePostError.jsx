// css
import "./DeletePostError.css";

const DeletePostError = () => {

    return (
        <div className={"DeletePostError"}>
            <div className={"DeletePostError-left"}>
                <span className={"DeletePostError-bold"}>존재하지 않거나, </span>
                <span className={"DeletePostError-bold"}>삭제된 </span>
                <span>게시물 입니다.</span>
            </div>
        </div>
    )
}

export default DeletePostError;