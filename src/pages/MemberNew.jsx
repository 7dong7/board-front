// css
import "./MemberNew.css";

// 컴포넌트
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";
import {useNavigate} from "react-router-dom";
import {usePublicApi} from "../api/PublicApi.jsx";
import {useState} from "react";

const MemberNew = () => {
    const nav = useNavigate(); // 페이지 이동
    const publicApi = usePublicApi(); // api 요청
    const [member, setMember] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        nickname: '',
        mobile: '',
        birthdate: '',
        frontNum: '',
        backNum: '',
    }); // 회원가입할 회원 정보 & 초기값
    const [errors, setErrors] = useState({}) // 각 필드별 에러를 담는 state


    // 회원 가입 요청
    const newMember = async () => {
        try {
            const response = await publicApi({
                method: "POST",
                url: "/api/members",
                data: member
            });
            console.log("response:", response);
            nav("/login");
        } catch (error) {
            console.log("error:", error);
            setErrors(error.response.data.data);
        }
    }

// ====== 이벤트 ====== //
    // 정규 표현식 규칙
    const validRegex = {
        email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || '유효한 이메일 형식이 아닙니다.',
        password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || '8자 이상, 영문+숫자 조합이어야 합니다.',
        confirmPassword: (value, form) => value === form.password || '비밀번호가 일치하지 않습니다.',
        name: (value) => /^[가-힣a-zA-Z]{2,10}$/.test(value) || '2~10자, 한글 또는 영문만 가능합니다.',
        nickname: (value) => /^[가-힣a-zA-Z0-9]{2,12}$/.test(value) || '2~12자, 특수문자는 불가합니다.',
        mobile: (value) => /^(010|011)-\d{4}-\d{4}$/.test(value) || '010-1234-5678 형식으로 입력하세요.',
        backNum: (value) => /^[1-4]$/.test(value) || '1, 2, 3, 4 중 하나를 입력하세요.',
        frontNum: (value) => {
            /**
             *  1. 8자리 숫자 검증 => yyyyMMdd
             */
            if (!/^\d{8}$/.test(value)) {
                return '예) 19990325 형식으로 입력하세요.'; // 형식이 맞지 않는 경우
            } // 숫자의 형식이 맞는 경우 이어서 진행
            /**
             *  2. 날짜 유효성 검사
             *      - 입력받을 8자리의 숫자가 날짜 형식이 맞는지
             *      - 형식은 맞지만 존재하는 날짜인지
             *      - 미래의 날짜는 사용할 수 없음
             */
            const year = value.slice(0, 4); const month = value.slice(4, 6); const day = value.slice(6, 8);
            const date = new Date(`${year}-${month}-${day}`);
            if (isNaN(date.getTime()) // 올바르지 않는 날자 형식
                || parseInt(month) !== date.getMonth() + 1 // "19970231" 형식은 맞으나 존재하지 않는 날짜 
                || parseInt(day) !== date.getDate() // "19970231" 날짜 형식은 맞으나 존재하지 않는 날짜
                || date > new Date() ) { // 미래의 날짜는 사용할 수 없음
                return "올바른 생년월일 형식이 아닙니다.";
            } else {
                return true;
            }
        } // frontNum 유효성 검증
    }
    // 필드값 변경시 유효성 검증 이벤트
    const onChangeData = (e) => {
        let {name, value} = e.target;
        // 생년월일 제한
        if (name === "frontNum" || name === "backNum") { // 생년월일 검증
            if (!/^\d*$/.test(value)) return;
        }
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
        // 회원가입시 보낼 데이터 수정 이벤트
        setMember({
            ...member,
            [name]: value
        });
        // 입력필드 유효성 검증
        const valid = validRegex[name];
        if (valid) {
            const error = typeof valid === 'function'
                                    ? ( valid(value, member) === true ? '' : valid(value, member) )
                                    : '';
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    }

    // 회원 가입 버튼 클릭 이벤트
    const newMemberHandler = () => {
        const allError = {}; // 각 필드별로 오류를 담을 객체

        // 각 오류 검증을 위한 정규식을 담은 필드 값을 반복한다
        Object.keys(validRegex).forEach((field) => {
            const valid = validRegex[field]; // 각 필드를 검증하는 function
            const value = member[field];    // 각 필드의 검증을 받아야된느 입력된 값
            const error = valid(value, member); //
            // console.log(valid, value, error);
            if(error !== true) allError[field] = error; // 오류가 조재하는경우 오류객체에 필드별 오류를 담는다
        });

        // console.log("allError 에 에러가 담겨있는면 회원가입 실행 안됨( {}로 출력되면 회원 가입 실행 )",allError);
        // 오류가 존재하는 경우 없앰
        if (Object.keys(allError).length > 0) {
            setErrors(allError);
            // console.log("errors 에 값이 있어서 회원가입 로직 실행안됨:", errors);
            return;
        }

        if (member) {
            console.log("프론트의 유효성 검사를 뚫고 회원가입 로직 실행");
            newMember();
        }
    }

    return (
        <div className={"MemberNew"}>
            <section className={"MemberNew-header-section"}>
                <Header title={"회원가입"} size={"h2"} color={"basic"}/>
            </section>
            <Line/>

            <section className={"MemberNew-member-form-section"}>
                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        이메일
                    </label>
                    <input
                        onChange={onChangeData}
                        name={"email"}
                        value={member.email}
                        type={"email"}
                        maxLength={40}
                        className={"MemberNew-member-input"}
                        placeholder={"아이디로 사용할 이메일을 입력해주세요."}/>
                    {
                        errors.email &&
                        <div className={"MemberNew-errorField"}>{errors.email}</div>
                    }
                </div>

                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        비밀번호
                    </label>
                    <input
                        onChange={onChangeData}
                        name={"password"}
                        value={member.password}
                        type={"password"}
                        maxLength={20}
                        className={"MemberNew-member-input"}
                        placeholder={"비밀번호"}/>
                    <input
                        onChange={onChangeData}
                        name={"confirmPassword"}
                        value={member.confirmPassword}
                        type={"password"}
                        maxLength={20}
                        className={"MemberNew-member-input MemberNew-member-confirmPassword"}
                        placeholder={"비밀번호 확인"}/>
                    {
                        errors.password &&
                        <div className={"MemberNew-errorField"}>{errors.password}</div>
                    }
                    {
                        errors.confirmPassword &&
                        <div className={"MemberNew-errorField"}>{errors.confirmPassword}</div>
                    }
                </div>

                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        이름
                    </label>
                    <input
                        onChange={onChangeData}
                        value={member.name}
                        name={"name"}
                        maxLength={12}
                        className={"MemberNew-member-input"}
                        placeholder={"이름"}/>
                    {
                        errors.name &&
                        <div className={"MemberNew-errorField"}>{errors.name}</div>
                    }
                </div>

                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        닉네임
                    </label>
                    <input
                        onChange={onChangeData}
                        value={member.nickname}
                        name={"nickname"}
                        maxLength={20}
                        className={"MemberNew-member-input"}
                        placeholder={"닉네임"}/>
                    {
                        errors.nickname &&
                        <div className={"MemberNew-errorField"}>{errors.nickname}</div>
                    }
                </div>

                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        휴대폰
                    </label>
                    <input
                        onChange={onChangeData}
                        value={member.mobile}
                        name={"mobile"}
                        className={"MemberNew-member-input"}
                        maxLength={13}
                        placeholder={"휴대폰"}/>
                    {
                        errors.mobile &&
                        <div className={"MemberNew-errorField"}>{errors.mobile}</div>
                    }
                </div>

                <div className={"MemberNew-member-data"}>
                    <label className={"MemberNew-member-label"}>
                        생년월일
                    </label>
                    <div className={"MemberNew-member-birth"}>
                        <input
                            onChange={onChangeData}
                            value={member.frontNum}
                            name={"frontNum"}
                            className={"MemberNew-member-input"}
                            maxLength={8}
                            placeholder={"생년월일 8자리 숫자"}/>
                        <span> - </span>
                        <input
                            onChange={onChangeData}
                            value={member.backNum}
                            name={"backNum"}
                            className={"MemberNew-member-input"}
                            maxLength={1}
                            placeholder={"주민번호 뒷자리 하나"}/>
                    </div>
                    {
                        errors.frontNum &&
                        <div className={"MemberNew-errorField"}>{errors.frontNum}</div>
                    }
                    {
                        errors.backNum &&
                        <div className={"MemberNew-errorField"}>{errors.backNum}</div>
                    }
                </div>
            </section>

            <section className={"MemberNew-new-section"}>
                <button onClick={newMemberHandler}
                        className={"MemberNew-new-btn"}>
                    회원가입
                </button>
            </section>

            <section className={"MemberNew-login-section"}>
                <span className={"MemberNew-login-span"}>이미 회원이신가요? </span>
                <button className={"MemberNew-login-btn"}
                        onClick={() => nav("/login")}>
                    로그인하기
                </button>
            </section>
        </div>
    );
};
export default MemberNew;