// css
import "./Posts.css";

// 컴포넌트
import SearchBar from "../components/common/SearchBar.jsx";
import PostItem from "../components/common/PostItem.jsx";
import PostPaging from "../components/common/PostPaging.jsx";
import NavButton from "../components/common/NavButton.jsx";

// 훅
import { useEffect, useReducer, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { usePublicApi } from "../api/PublicApi.jsx";

/**
 *  서버에 대한 검색 요청은 useEffect 를 사용해서 변경한다
 *      useEffect 에 반응 하는 state 는 reducer를 사용해서 변경한다
 *
 *      state의 값 변경 기점
 *          - size 변경
 *          - "찾기" 클릭
 *          - 페이지 이동
 *
 *      그 외에는 변경하지 않음
 */
function reducer(state, action) {
    console.log("===== reducer 시작 ====");
    console.log("action: ", action);
    console.log("action.data: ", action.data);
    console.log("state: ", state);
    switch (action.type) {
        case "SEARCH":
            return console.log("찾기 버튼 클릭");
        case "CHANGE_SIZE":
            console.log("게시글 목록 수 변경")
            return {...state,
                size: action.data.size};
        case "CHANGE_PAGE":
            return console.log("페이지 번호를 변경");
    }
}

const Posts = () => {
    console.log("렌더링 됨");
    const publicApi = usePublicApi(); // api Context
    const [searchStatus, setSearchStatus] = useState({ // 검색 상태
        page: "0",
        searchType: "title",
        searchWord: "",
        searchSize: "20", // 기본 크기 설정
    });
    const [searchParams, setSearchParams] = useSearchParams();// url 파라미터 받기


    console.log("searchParams : ", searchParams);
    const [state, dispatch] = useReducer(reducer, []); // reducer 초기값 search 파람
    console.log("reducer 값 state:", state);

    const [postPage, setPostPage] = useState({ // 서버에서 가져온 게시글 목록
        content: [],
        totalPage: 0,
        currentPage: parseInt(searchParams.get('page') || '0', 10),
    });
    const [loading, setLoading] = useState(false); // 로딩 중


    // 게시글 가져오기 (요청)
    const posts = async (searchParam) => {
        setLoading(true);
        try {
            console.log("posts 요청 중:", searchParam);

            const response = await publicApi({
                url:"/api/posts",
                method: "GET",
                params: {
                    page: searchParam.page,
                    size: searchParam.size,
                    sort: 'id,desc',
                    searchType: searchParam.searchType,
                    searchWord: searchParam.searchWord,
                }
            });
            setPostPage({
                content: response.data.content,
                totalPages: response.data.totalPages,
                currentPage: searchParam.page,
            });
        } catch (error) {
            console.log("error: ", error);
            setPostPage({content:[], totalPages:0, currentPage: searchParam.page})
        } finally {
            setLoading(false);
        }
    }

    console.log("이펙트 전에 state: ", {...state, name:"hi"});
    useEffect(() => {
        const page = searchParams.get("page");
        const searchType = searchParams.get("searchType");
        const searchWord = searchParams.get("searchWord");
        const size = searchParams.get("size");
        // const page = searchStatus.page;
        // const searchType = searchStatus.searchType;
        // const searchWord = searchStatus.searchWord;
        // const size = searchStatus.searchSize;
        console.log(`페이지 번호:${page}, 페이지사이즈:${size}, 검색조건:${searchType}, 검색어:${searchWord}`);
        posts(searchParams);
    }, [state]);


    // ===== 이벤트 핸들러 =====
    const sizeChange = (value) => {
        console.log("사이즈 변경: ", value);
        dispatch({
            type: "CHANGE_SIZE",
            data: {
                size: value,
            }
        });
    };





    if (loading) {
        return <div>로딩중...</div>
    }

    return (
        <div className={"Posts"}>
            <section className={"posts-searchBar-section"}>
                <SearchBar
                    searchState={searchStatus}
                    // onChangeState={onChangeSearchParams}
                    // searchPost={searchPost}
                    sizeChange={sizeChange}
                />
            </section>

            <section className={"posts-body-title-section"}>
                <div>글 번호</div>
                <div>제목</div>
                <div>조회수</div>
                <div>작성자</div>
                <div>작성일</div>
            </section>
            <section className={"posts-body-content-section"}>
                {postPage.content.map(
                    (item) => <PostItem key={item.postId} {...item} />
                )}
            </section>

            <section>
                <NavButton text={"글 쓰기"} path={"/posts/new"} className={"Nav-new-posts"}/>
            </section>

            <section className={"paging-nav"}>
                {/*<PostPaging*/}
                {/*    postPage={postPage}*/}
                {/*    pageNumbers={pageNumbers}*/}
                {/*    handlePageChange={handlePageChange}*/}
                {/*    />*/}
            </section>
        </div>
    );
}

export default Posts;