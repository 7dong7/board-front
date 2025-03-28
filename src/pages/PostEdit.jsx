// css
import "./PostEdit.css";

// ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// 컴포넌트
import Header from "../components/common/Header.jsx";
import Line from "../components/common/Line.jsx";

// 훅
import {useNavigate, useParams} from "react-router-dom";
import {useApi} from "../api/ApiContext.jsx";
import {usePublicApi} from "../api/PublicApi.jsx";
import {useEffect, useState} from "react";

const PostEdit = () => {
    const {postId} = useParams(); // 동적 경로값
    const [post, setPost] = useState({ // 게시글 확인
        title: "",
        content: "",
    });
    const nav = useNavigate();
    const api = useApi(); // 요청 기본 설정
    const publicApi = usePublicApi();
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 수정하기 위한 게시글 내용 확인 API
    const viewApi = async () => {
        try {
            const response = await publicApi({
                method: "GET",
                url: `/api/posts/${postId}`,
            })
            setPost({ // 게시글값 설정
                title: response.data.title,
                content: response.data.content,
            });
            setLoading(false); // 로딩 완료
        } catch (error) {
            console.log("error:", error);
        }
    }

    // 서버에 보내는 수정 요청 API
    const patchApi = async () => {
        try {
            const response = await api({
                method: "PATCH",
                url: `/api/posts/${postId}`,
                data: {
                    title: post.title,
                    content: post.content,
                }
            })
            nav(`/posts/${postId}`);
        } catch (error) {
            console.error("error:", error);
        }
    }

    useEffect(() => {
        viewApi()
    }, []);

// ====== 이벤트 ======
    const onChangeTitle = (e) => { // 제목 변경 이벤트
        setPost({
            ...post,
            title: e.target.value,
        });
    }

    const patchHandler = () => {
        patchApi();
    }

    if (loading) {
        return(
            <div>로딩중...</div>
        )
    }

    return (
        <div className={"PostEdit"}>
            <section className={"PostEdit-header"}>
                <Header size={"h2"} title={"게시글 수정하기"} loc={"left"} color={"basic"}/>
            </section>
            <Line/>
            {/*  */}
            <label
                className={"post-label"}>
                제목
            </label>
            <input
                className={"postNew-title"}
                onChange={onChangeTitle}
                value={post.title}/>


            <label
                className={"post-label"}
            >
                내용
            </label>
            <section className={"PostEdit-editor"}>
                <CKEditor
                    editor={ClassicEditor}
                    data={post.content}
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
                        setPost({
                            ...post,
                            content: editor.getData()
                        });
                    }}
                />
            </section>


            <section className={"PostEdit-editor-btn"}>
                <button
                    className={"post-button"}
                    onClick={patchHandler}>
                    수정하기
                </button>
            </section>

        </div>
    );
}

export default PostEdit;