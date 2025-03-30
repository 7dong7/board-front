// css
import "./MemberInfo.css";

// 훅
import {format} from "date-fns";

const MemberInfo = ({member}) => {

    console.log("MemberInfo member:", member);

    return (
        <div className={"MemberInfo"}>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>가 입 일</span>
                <span className={"MemberInfo-column-value"}>
                    {format(new Date(member.createdAt), 'yyyy-MM-dd')}
                </span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>사 용 자 번 호</span>
                <span className={"MemberInfo-column-value"}>{member.memberId}</span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>이 름</span>
                <span className={"MemberInfo-column-value"}>{member.name}</span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>닉 네 임</span>
                <span className={"MemberInfo-column-value"}>{member.nickname}</span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>이 메 일</span>
                <span className={"MemberInfo-column-value"}>{member.email}</span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>게 시 글 수</span>
                <span className={"MemberInfo-column-value"}>{member.postCount}</span>
            </div>
            <div className={"MemberInfo-column"}>
                <span className={"MemberInfo-column-name"}>댓 글 수</span>
                <span className={"MemberInfo-column-value"}>{member.commentCount}</span>
            </div>
        </div>
    );
}

export default MemberInfo;