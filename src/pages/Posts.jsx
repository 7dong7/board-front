// css
import "./Posts.css";

// 컴포넌트
import SearchBar from "../components/common/SearchBar.jsx";
import PostItem from "../components/common/PostItem.jsx";
import PostPaging from "../components/common/PostPaging.jsx";
import NavButton from "../components/common/NavButton.jsx";

// 훅
import {useEffect, useState} from "react";
import {usePublicApi} from "../api/PublicApi.jsx";
import { useSearchParams } from "react-router-dom";


const Posts = () => {
    // api Context
    const publicApi = usePublicApi();
    const [searchParams, setSearchParams] = useSearchParams();
    // 검색 상태
    const [searchStatus, setSearchStatus] = useState({
        searchType: searchParams.get("searchType") || "",
        searchWord: searchParams.get("searchWord"),
        searchSize: 20, // 기본 크기 설정
    });
    // 게시글 상태
    const [postPage, setPostPage] = useState({
        content:[],
        totalPage: 0,
        currentPage: parseInt(searchParams.get('page') || '0', 10),
    })
    // 로딩 상태
    const [loading, setLoading] = useState(false);

    // 검색 상태 변환 메소드
    const onChangeState = (e) => {
        setSearchStatus({
            ...searchStatus,
            [e.target.name]: e.target.value,
        })
    }
    // 게시글 상태 변환 메소드
    const searchPost = () => {
        setSearchParams({
            page: '0', // 검색조건 변화
            searchType: searchStatus.searchType,
            searchWord: searchStatus.searchWord,
        })
    }

    // 게시글 가져오기
    const posts = async (page, searchType = '', searchWord = '') => {
        setLoading(true);
        try {
            const response = await publicApi({
                url:"/api/posts",
                method: "GET",
                params: {
                    page: page,
                    size: searchStatus.searchSize,
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

            console.log("response.data: ", response.data);
            console.log("postPage: ", postPage);
        } catch (error) {
            console.log("error: ", error);
            setPostPage({content:[], totalPages:0, currentPage: page})
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '0', 10);
        posts(page, searchStatus.searchType, searchStatus.searchWord);
    }, [searchParams]);

    // 페이지 이동
    const handlePageChange = (newPage) => {
        setSearchParams({
            page: newPage.toString(),
            searchType: searchStatus.searchType,
            searchWord: searchStatus.searchWord,
        });
    };

    if (loading) {
        return (
            <div>로딩중</div>
        );
    }

    const getPageNumbers = () => {

    }

    console.log("searchParams: ", searchParams);

    return (
        <div className={"Posts"}>
            <section className={"posts-searchBar-section"}>
                <SearchBar
                    searchState={searchStatus}
                    onChangeState={onChangeState}
                    searchPost={searchPost}/>
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
                    postPage.content.map(
                        (item) => <PostItem key={item.postId} {...item} />
                    )
                }
            </section>

            <section>
                <NavButton text={"글 쓰기"} path={"/posts/new"} className={"Nav-new-posts"}/>
            </section>

            <section className={"paging-nav"}>
                <PostPaging postPage={postPage} handlePageChange={handlePageChange}/>

                <button
                    onClick={() => handlePageChange(postPage.currentPage - 1)}
                    disabled={postPage.currentPage === 0}
                >
                    이전
                </button>

                <span>
                    {postPage.currentPage + 1} / {postPage.totalPages}
                </span>

                <button
                    onClick={() => handlePageChange(postPage.currentPage + 1)}
                    disabled={postPage.currentPage >= postPage.totalPages - 1}
                >
                    다음
                </button>
            </section>
        </div>
    );
}

export default Posts;