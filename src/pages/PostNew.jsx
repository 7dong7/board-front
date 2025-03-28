// css
import "./PostNew.css";

// 컴포넌트
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";

// 훅
import {useState} from "react";
import {useApi} from "../api/ApiContext.jsx";

// ckEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useRefrshApi} from "../api/RefreshContext.jsx";


const PostNew = () => {
    const [content, setContent] = useState(""); // 내용
    const [title, setTitle] = useState(""); // 제목
    const api = useApi(); // api 요청
    const refreshApi = useRefrshApi();

    const requestCreatePost = async () => { // 요청
        try {
            const response = await api({
                url: "/api/posts/new",
                method: "POST",
                data: {
                    title: title,
                    content: content,
                }
            });
            console.log("response:", response);
            console.log("response.status: ", response.status);
        } catch (error) {
            console.error("에러 발생: ", error);
            console.log("error data ", error.response.data,", error status: ", error.response.status);

            console.log("error.response.data", error.response.data);
            if(error.response.data.error === 'access token expired') { // access token 이 만료됐다는 응답을 받은 경우
            // === access 토큰 재요청 ====
                try {
                    const response = await refreshApi(); // 사용한 refresh 토큰과 access 토큰 재발급
                    
                    const access = response.headers.access;
                    localStorage.setItem("access", access);
                } catch (error) {
                    console.log("refresh error: ", error);
                }
            }
        }
    }


// ==== 이벤트 처리 ====
    const onChangeTitle = (e) => { // 제목 작성
        setTitle(e.target.value);
    };

    const createPostHandler = () => { // 게시글 작성하기 요청
        requestCreatePost();
    }

    return (
        <div className={"PostNew"}>
            <Header title={"게시글 작성"} size={"h2"} color={"basic"} loc={"center"}/>
            <Line />

            {/* 게시글 제목 입력 */}
            <label
                className={"post-label"}>
                제목
            </label>
            <input
                id={"title"}
                className={"postNew-title"}
                value={title}
                onChange={onChangeTitle}
                placeholder={"제목을 입력하세요"}/>

            {/* 게시글 내용 입력 */}
            <label
                className={"post-label"}
            >
                내용
            </label>
            <CKEditor
                editor={ClassicEditor}
                data={content}
                config={{ // 상용으로 사용시 라이센스키 사용
                    licenseKey: 'GPL', // 오픈소스
                    ckfinder: { // 이미지 파일 업로드
                        uploadUrl: "http://localhost:8080/api/image/upload",
                        withCredentials: true,
                    }
                }}
                onReady={editor => {
                    // console.log('CkEditor 준비: ', editor);
                }}
                onChange={(event, editor) => {
                    // console.log("editor 글 내용: ", editor.getData());
                    setContent(editor.getData());
                }}
                // onBlur={(event, editor) => {
                //     console.log('Blur.', editor);
                // }}
                // onFocus={(event, editor) => {
                //     console.log('Focus.', editor);
                // }}
            />

            <button
                className={"post-button"}
                onClick={createPostHandler}>
                작성하기
            </button>
        </div>
    );
}

export default PostNew;