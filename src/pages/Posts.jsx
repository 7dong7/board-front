// css
import "./Posts.css";

// 컴포넌트
import SearchBar from "../components/common/SearchBar.jsx";
import PostItem from "../components/common/PostItem.jsx";
import Paging from "../components/common/Paging.jsx";
import NavButton from "../components/common/NavButton.jsx";

// 훅
import { useEffect, useState} from "react";
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

const Posts = () => {
    const publicApi = usePublicApi(); // api Context
    const [searchState, setSearchState] = useState({ // 검색 상태
        page: '1',
        searchType: 'title',
        searchWord: '',
        size: '20', // 기본 크기 설정
    });
    const [searchParams, setSearchParams] = useSearchParams();// url 파라미터 받기
    const [postPage, setPostPage] = useState();
    const [loading, setLoading] = useState(true); // 로딩 중


    // 게시글 가져오기 (요청)
    const posts = async () => {
        setLoading(true);
        try {
            const response = await publicApi({
                url:"/api/posts",
                method: "GET",
                params: {
                    page: searchParams.get("page"),
                    size: searchParams.get("size"),
                    sort: 'id,desc',
                    searchType: searchParams.get("searchType"),
                    searchWord: searchParams.get("searchWord"),
                }
            });
            setPostPage(response.data);
        } catch (error) {
            console.log("error: ", error);
            setPostPage()
        } finally {
            setLoading(false);
        }
    }

    // searchParams 의 값 변경시 posts api 요청
    useEffect(() => {
        const page = searchParams.get("page");
        const searchType = searchParams.get("searchType");
        const searchWord = searchParams.get("searchWord");
        const size = searchParams.get("size");
        // const page = searchState.page;
        // const searchType = searchState.searchType;
        // const searchWord = searchState.searchWord;
        // const size = searchState.size;
        console.log(`페이지 번호:${page}, 페이지사이즈:${size}, 검색조건:${searchType}, 검색어:${searchWord}`);
        posts();
    }, [searchParams]);


// ======== 페이징 처리 ========
    // 페이징바 설정 // 페이지 객체를 설정으로 넣어주면 된다
    const renderPageNumbers = (page) => { // 페이징 렌더링을 기준점이 필요함
        if (page) {
            const renderNumbers = 7; // 렌더링할 페이징 수 => 1,2,3,4,5,6,7
            const startPage = Math.max(1,
                parseInt(page.number+1) - Math.floor(renderNumbers / 2) > page.totalPages - renderNumbers
                    ? parseInt(page.totalPages) - renderNumbers + 1
                    : parseInt(page.number + 1) - Math.floor(renderNumbers / 2)
            ); // 페이징바의 시작 페이지번호
            const endPage = Math.min(page.totalPages + 1, startPage + renderNumbers); // 페이징바의 마지막 페이지 번호
            return Array.from({length: endPage - startPage}, (_, i) => startPage + i);
        }
    }

// ======== 이벤트 ========
    // 검색 조건 & 검색어 변경 => searchState 에 저장
    const changeSearchState = (e) => {
        setSearchState({
            ...searchState,
            [e.target.name]: e.target.value,
        });
    }
    // 페이지 size 변경 => posts api 요청
    const changeSize = (value) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        setSearchState({
            ...searchState,
            size: value,
        });
        setSearchParams({
            ...currentParams,
            page: '1',
            size: value,
        });
    };
    // 게시글 검색
    const searchPosts = () => {
        const currentParams = Object.fromEntries(searchParams.entries());
        setSearchParams({
            ...currentParams,
            page: '1',
            searchType: searchState.searchType,
            searchWord: searchState.searchWord,
        });
    }
    // 페이지 이동 ( 페이지 네비게이션을 사용하는 이동 )
    const handlePageChange = (newPage) => {
        if(newPage >= 1 && newPage < postPage.totalPages + 1) { // page 범위 지정 (실제 사용하는 범위를 벗어나지 못함)
            setSearchParams({
                page: newPage.toString(),
                searchType: searchParams.get("searchType"),
                searchWord: searchParams.get("searchWord"),
                size: searchParams.get("size"),
            });
        }
    };

    if (loading) {
        return <div>로딩중...</div>
    }

    const postNumbers = renderPageNumbers(postPage);

    return (
        <div className={"Posts"}>
            <section className={"posts-searchBar-section"}>
                <SearchBar
                    searchState={searchState}
                    changeSearchState={changeSearchState}
                    changeSize={changeSize}
                    searchPosts={searchPosts}
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
                {
                    postPage &&
                    postPage.content.map(
                        (item) => <PostItem key={item.postId} {...item} />
                )}
            </section>

            <section>
                <NavButton text={"글 쓰기"} navPath={"/posts/new"} className={"Nav-new-posts"}/>
            </section>

            <section className={"paging-nav"}>
                <Paging
                    pageNumbers={postNumbers}
                    handlePageChange={handlePageChange}
                    page={postPage}
                    />
            </section>
        </div>
    );
}

export default Posts;