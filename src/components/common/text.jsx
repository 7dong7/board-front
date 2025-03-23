// css
import "./Posts.css";

// 컴포넌트
import SearchBar from "../components/common/SearchBar.jsx";
import PostItem from "../components/common/PostItem.jsx";
import PostPaging from "../components/common/PostPaging.jsx";
import NavButton from "../components/common/NavButton.jsx";

// 훅
import {useEffect, useReducer, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { usePublicApi } from "../api/PublicApi.jsx";

/**
 *  서버에 대한 검색 요청은 useEffect 를 사용해서 변경한다
 *      useEffect 에 반응 하는 state 는 Reducer를 사용해서 변경한다
 */
function reducer(state, action) {
    console.log("===== reducer 시작 ====");
    console.log("action: ", action);
    console.log("action.data: ", action.data);
    console.log("state: ", state);

    switch (action.type) {
        case 'SEARCH_STATUS_CHANGE':
            return { ...state, [action.data.params]: action.data.value };
        case 'SEARCH_TYPE_CHANGE':
            return { ...state }; // 수정 해야됨
        case 'CHANGE_SIZE':
            return { ...state, size: action.data.size };

    }


    console.log("===== reducer 끝 ====")
}

const Posts = () => {
    // api Context
    const publicApi = usePublicApi();
    const [searchParams, setSearchParams] = useSearchParams(); // url 파라미터 받기
    console.log("searchParams 값: ", searchParams);
    const [state, dispatch] = useReducer(reducer, searchParams); // reducer 초기값 search 파람
    console.log("state: 값: ", state);

    const [searchStatus, setSearchStatus] = useState({ // 검색 상태
        searchType: searchParams.get("searchType") || "title",
        searchWord: searchParams.get("searchWord") || "",
        searchSize: searchParams.get("size") || "20", // 기본 크기 설정
    });
    const [postPage, setPostPage] = useState({ // 게시글 상태
        content: [],
        totalPage: 0,
        currentPage: parseInt(searchParams.get('page') || '0', 10),
    });
    const [loading, setLoading] = useState(false); // 로딩 상태

    console.log("==== posts 렌더링 시작 ====");
    console.log(searchStatus);
    console.log(searchParams.get("searchType"), searchParams.get("searchWord"), searchParams.get("size"));
    console.log("==== posts 렌더링 중 ====");

    /**
     *  검색 창 상태변화
     *  "찾기" 버튼 클릭 시 서버에서 searchStatus 를 가지고 검색 요청 ( 서버에 요청 )
     *
     *  "20개씩 보기" size 변경 시 현재 searchStatus 를 가지고 size 변경 ( 서버에 요청 )
     */
        // 검색 상태 변환 메소드
    const onChangeSearchParams = (e) => {
            console.log("onChangeState 이벤트 발생 searchStatusChange");
            dispatch({
                type: "SEARCH_STATUS_CHANGE",
                data: {
                    params: e.target.name,
                    value: e.target.value
                }
            });

            setSearchStatus({
                ...searchStatus,
                [e.target.name]: e.target.value,
            });
            console.log("onChangeState searchStatus: ", searchStatus);
        }
    // 검색 사이즈 변환
    const onChangeSearchSize = (value) => {
        console.log("onChangeSearchSize 작동: ", value);
        dispatch({
            type: "CHANGE_SIZE",
            data: {
                size: value
            }
        })
    }

    // 게시글 상태 변환 메소드
    const searchPost = () => {
        const newParams = {
            page: '0', // 검색조건 변화
            searchType: searchStatus.searchType,
            searchWord: searchStatus.searchWord,
            searchSize: searchStatus.searchSize
        };
        setSearchParams(newParams);
    }

    // 서버에서 페이지 정보를 요청 => searchParams 의 값이 바뀌면
    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '0', 10);
        console.log("=== useEffect 시작 ==");
        console.log(searchStatus);
        console.log(searchParams);
        console.log("=== useEffect 끝 ==");
        posts(page, searchStatus.searchType, searchStatus.searchWord, parseInt(searchStatus.searchSize));
    }, [searchParams]);

    // 게시글 가져오기 (요청)
    const posts = async (page, searchType = '', searchWord = '', size = 20) => {
        setLoading(true);
        try {
            const response = await publicApi({
                url:"/api/posts",
                method: "GET",
                params: {
                    page: page || 0,
                    size: size || 20,
                    sort: 'id,desc',
                    searchType: searchType || null,
                    searchWord: searchWord || null,
                }
            });

            setPostPage({
                content: response.data.content,
                totalPages: response.data.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.log("error: ", error);
            setPostPage({content:[], totalPages:0, currentPage: page})
        } finally {
            setLoading(false);
        }
    }

    // 페이지 이동 ( 페이지 네비게이션을 사용하는 이동 )
    const handlePageChange = (newPage) => {
        if(newPage >= 0 && newPage < postPage.totalPages + 1) { // page 범위 지정 (실제 사용하는 범위를 벗어나지 못함)
            setSearchParams({
                page: newPage.toString(),
                searchType: searchStatus.searchType,
                searchWord: searchStatus.searchWord,
                searchSize: searchStatus.searchSize,
            });
        }
    };

    if (loading) {
        return (
            <div>로딩중</div>
        );
    }

    const getPageNumbers = () => {
        const {currentPage, totalPages} = postPage;
        const startPage = Math.max(0, currentPage - 3); // 현재 페이지 기준 좌우 2개
        const endPage = Math.min(startPage + 6, totalPages); // 최대 5개
        return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
    }

    const pageNumbers = getPageNumbers();

    return (
        <div className={"Posts"}>
            <section className={"posts-searchBar-section"}>
                <SearchBar
                    searchState={searchStatus}
                    onChangeState={onChangeSearchParams}
                    searchPost={searchPost}
                    onChangeSearchSize={onChangeSearchSize}
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
                <PostPaging
                    postPage={postPage}
                    pageNumbers={pageNumbers}
                    handlePageChange={handlePageChange}
                />
            </section>
        </div>
    );
}

export default Posts;