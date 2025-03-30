// css
import "./MemberDetail.css";


// 훅
import {useParams} from "react-router-dom";
import Line from "../components/common/Line.jsx";
import Header from "../components/common/Header.jsx";

const MemberDetail = () => {
    const {id} = useParams(); // 사용자 번호


    console.log("사용자번호 id:", id);


    return (
        <div className={"MemberDetail"}>
            <section className={"MemberDetail-header-section"}>
                <Header
                    title={"사용자 정보"}
                    size={"h2"}
                    color={"basic"}/>
            </section>
            <Line/>

            <section className={"MemberDetail-member-section"}>
                사용자 정보 표시
            </section>

            <section className={"MemberDetail-posts-section"}>
                사용자 게시글 목록
            </section>
        </div>
    );
}

export default MemberDetail;