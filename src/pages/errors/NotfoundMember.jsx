// css
import "./NotfoundMember.css";

const NotfoundMember = () => {

    return (
        <div className={"NotfoundMember"}>
            <div className={"NotfoundMember-left"}>
                <span>해당 회원은 </span>
                <span className={"NotfoundMember-bold"}>존재하지 않거나</span>
                <span>,</span>
            </div>
            <div className={"NotfoundMember-left"}>
                <span className={"NotfoundMember-bold"}>탈퇴한 </span>
                <span>회원입니다</span>
            </div>
        </div>
    )
}

export default NotfoundMember;