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
    const [errors, setErrors] = useState({}) // 각 필드별 에러를 담는 state
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
            console.log("response.data:", response.data);
            setProfile(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log("error:", error);
        }
    }
    // 사용자의 정보를 수정 요청
    const editProfile = async () => {
        try {
            const response = await api({
                method: "PATCH",
                url: `/api/members/${id}`,
                data: profile // 수정된 데이터 요청시 보냄
            });
            console.log("response:", response);
            localStorage.removeItem("verifyPassword");
            nav(`/members/${id}`);
        } catch (error) {
            console.log("error,", error);
            setErrors(error.response.data.data);
        }
    }
    // 사용자의 정보를 탈퇴 요청
    const deleteMember = async () => {
        try {
            const response = await api({
                method: "DELETE",
                url: `/api/members/${id}`,
            });
            localStorage.removeItem("access");
            localStorage.removeItem("verifyPassword");
            console.log("response:", response);

            nav(`/posts`);
        } catch (error) {
            console.log("error:", error);
        }
    }

    useEffect(() => {
        memberProfile();
    }, []);

// ============ 이벤트 ============== //
    // 검증 표현식
    const validRegex = {
        password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || '8자 이상, 영문+숫자 조합이어야 합니다.',
        confirmPassword: (value, form) => value === form.password || '비밀번호가 일치하지 않습니다.',
        nickname: (value) => /^[가-힣a-zA-Z0-9]{2,12}$/.test(value) || '2~12자, 특수문자는 불가합니다.',
        mobile: (value) => /^(010|011)-\d{4}-\d{4}$/.test(value) || '010-1234-5678 형식으로 입력하세요.',
    }
    // 회원 정보 수정 입력 이벤트
    const onChangeProfile = (e) => { // 회원 정보수 입력
        let {name, value} = e.target;
        // 모바일 번호 제한
        if (name === "mobile") {
            // 올바른 위치에 대시 추가
            if (value.length > 3 && value.charAt(3) !== '-') {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
            if (value.length > 8 && value.charAt(8) !== '-') {
                value = value.slice(0, 8) + '-' + value.slice(8);
            }
        }
        // 입력필드 유효성 검증
        const valid = validRegex[name];
        if (valid) {
            const error = typeof valid === 'function'
                ? ( valid(value, profile) === true ? '' : valid(value, profile) )
                : '';
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
        setProfile({
            ...profile,
            [name]: value,
        });
    };
    // 회원 정보 요청 이벤트
    const editProfileHandler = () => { // 회원 정보 수정 요청
        const allError = {}; // 각 필드별로 오류를 담을 객체

        // 각 오류 검증을 위한 정규식을 담은 필드 값을 반복한다
        Object.keys(validRegex).forEach((field) => {
            const valid = validRegex[field]; // 각 필드를 검증하는 function
            const value = profile[field];    // 각 필드의 검증을 받아야된느 입력된 값
            const error = valid(value, profile); //
            // console.log(valid, value, error);
            if(error !== true) allError[field] = error; // 오류가 조재하는경우 오류객체에 필드별 오류를 담는다
        });

        // 오류가 존재하는 경우 없앰
        if (Object.keys(allError).length > 0) {
            setErrors(allError);
            // console.log("errors 에 값이 있어서 회원가입 로직 실행안됨:", errors);
            return;
        }
        // 사용자 정보 수정 요청 실행
        if (profile) {
            editProfile();
        }
    }
    // 회원 탈퇴 요청
    const memberDeleteHandler = () => {
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

            <section className={"MemberEdit-data-form-section"}>
                <div className={"MemberEdit-data-form"}>
                    <label>닉네임</label>
                    <input
                        onChange={onChangeProfile}
                        name={"nickname"}
                        type={"text"}
                        value={profile.nickname || ''}
                        placeholder={"닉네임"}/>
                    {
                        errors.nickname &&
                        <div className={"MemberEdit-errorField"}>{errors.nickname}</div>
                    }
                </div>

                <div className={"MemberEdit-data-form"}>
                    <label>휴대폰</label>
                    <input
                        onChange={onChangeProfile}
                        name={"mobile"}
                        maxLength={13}
                        value={profile.mobile || ''}/>
                    {
                        errors.mobile &&
                        <div className={"MemberEdit-errorField"}>{errors.mobile}</div>
                    }
                </div>

                <div className={"MemberEdit-data-form"}>
                    <label>새 비밀번호</label>
                    <input
                        onChange={onChangeProfile}
                        className={"MemberEdit-data-password"}
                        name={"password"}
                        type={"password"}
                        maxLength={20}
                        value={profile.password || ''}
                        placeholder={"새 비밀번호"}/>
                    <input
                        onChange={onChangeProfile}
                        name={"confirmPassword"}
                        type={"password"}
                        maxLength={20}
                        value={profile.confirmPassword || ''}
                        placeholder={"비밀번호 확인"}/>
                    {
                        errors.password &&
                        <div className={"MemberEdit-errorField"}>{errors.password}</div>
                    }
                    {
                        errors.confirmPassword &&
                        <div className={"MemberEdit-errorField"}>{errors.confirmPassword}</div>
                    }
                </div>
            </section>

            <section className={"MemberEdit-data-form-section MemberEdit-btn-section"}>
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