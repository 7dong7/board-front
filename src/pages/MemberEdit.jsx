// css
import "./MemberEdit.css";

// 훅
import {useNavigate, useParams} from "react-router-dom";
import {useApi} from "../api/ApiContext.jsx";
import {useEffect, useState} from "react";
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";

const MemberEdit = () => {
    const {id} = useParams(); // url 경로 파라미터
    const api = useApi(); // 요청 api
    const [profile, setProfile] = useState(); // 수정 정보 상태
    const [loading, setLoading] = useState(true); // 로딩중
    const nav = useNavigate();
    
    // 사용자의 정보를 확인 요청
    const memberProfile = async () => {
        try {
            const response = await api({
                method: "GET",
                url: `/api/members/profile`,
                params : {
                    id: id
                }
            });
            console.log("response:", response);
            setProfile(response.data);

            setLoading(false);
        } catch (error) {
            console.log("error:", error);
        }
    }
    // 사용자의 정보를 수정 요청
    const editProfile = async () => {
        console.log(profile);
        const propdata = {
            nickname: "nickanme",
            mobile: "02020,,200",
            active: "라ㅓㅁㄴㅇ",
        }
        console.log(propdata);
        try {
            const response = await api({
                method: "PATCH",
                url: `/api/members/${id}`,
                data: profile // 수정된 데이터 요청시 보냄
                /**
                 *  데이터 요청시 차이
                 *  data: profile
                 *      {
                 *          "nickname": "member1",
                 *          "mobile": "010-3333-3333"
                 *      }
                 *
                 *  data: {profile}
                 *      {
                 *          "profile": {
                 *              "nickname": "member1",
                 *              "mobile": "010-3333-3333"
                 *          }
                 *      }
                 */
            });
            console.log("response:", response);
            nav(`/members/${id}`);
        } catch (error) {
            console.log("error,", error);
        }
    }
    // 사용자의 정보를 탈퇴 요청
    const deleteMember = async () => {

        try {
            const response = await api({
                method: "DELETE",
                url:`/api/members/${id}`,
            })
            console.log("response:", response);

        } catch (error) {
            console.log("error:", error);
        }
    }


    useEffect(() => {
        memberProfile();
    }, []);

// ============ 이벤트 ============== //
    const onChangeProfile = (e) => { // 회원 정보수 입력
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }
    const editProfileHandler = () => { // 회원 정보 수정 요청
        editProfile()
    }
    const memberDeleteHandler = () => { // 회원 탈퇴 요청
        if(confirm("탈퇴한 계정은 다시 복구할 수 없습니다. 정말 탈퇴 하시겠습니까?")) {
            deleteMember();
        }
    }

    // 로딩중
    if (loading) {
        return (
            <div>로딩중...</div>
        )
    }

    return (
        <div className={"MemberEdit"}>
            <section className={"MemberEdit-header-section"}>
                <Header title={"사용자 정보수정"} size={"h2"} color={"basic"}/>
            </section>
            <Line/>

            <section className={"MemberEdit-section"}>
                <label>닉네임</label>
                <input
                    className={"nickname"}
                    name={"nickname"}
                    onChange={onChangeProfile}
                    value={profile.nickname}/>
            </section>

            <section className={"MemberEdit-section"}>
                <label>모바일</label>
                <input
                    className={"mobile"}
                    name={"mobile"}
                    onChange={onChangeProfile}
                    value={profile.mobile || ''}/>
            </section>

            <section className={"MemberEdit-section MemberEdit-btn-section"}>
                <button onClick={editProfileHandler}
                    className={"MemberEdit-btn MemberEdit-edit-btn"}>
                    수정하기
                </button>
                <button
                    onClick={memberDeleteHandler}
                    className={"MemberEdit-btn MemberEdit-delete-btn"}>
                    탈퇴하기
                </button>
            </section>
        </div>
    );
}

export default MemberEdit;