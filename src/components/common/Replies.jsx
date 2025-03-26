// css
import "./Replies.css";
import {format} from "date-fns";

const Replies = ({reply}) => {

    return (
        <div className={"Replies"}>
            <div className={"Replies-info"}>
                <span className={"Replies-author"}>{reply.author}</span>
                <span className={"Replies-createAt"}>
                    {reply.createdAt ? format(new Date(reply.createdAt), 'yyyy-MM-dd HH:mm:ss') : "로딩중..."}
                </span>
            </div>
            <div className={"Replies-content"}>{reply.content}</div>
        </div>
    );
}
export default Replies;