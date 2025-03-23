// css
import "./SearchBar.css"

const SearchBar = ( {searchState, changeSearchState, changeSize, searchPosts} ) => {

    // 검색 조건, 검색어 변경 이벤트 => searchState 값 변경
    const onChangeSearchState = (e) => {
        changeSearchState(e)
    }
    // 페이지 사이즈 변경
    const onChangeSize = (e) => {
        changeSize(e.target.value);
    }
    // "찾기" 클릭 이벤트
    const searchPostsHandler = () => {
        searchPosts();
    }

    return (
        <div className={"SearchBar"}>
            <section className={"section-left"}>
                <select
                    value={searchState.searchType}
                    name={"searchType"}
                    onChange={onChangeSearchState}>
                    <option value={"title"}>제목</option>
                    <option value={"nickname"}>작성자</option>
                    <option value={"content"}>내용</option>
                    <option value={"title_content"}>제목+내용</option>
                </select>

                <input
                    onChange={onChangeSearchState}
                    value={searchState.searchWord}
                    name={"searchWord"}
                    placeholder={"검색어 입력"} />

                <button onClick={searchPostsHandler}>찾기</button>
            </section>

            <section className={"section-right"}>
                <select
                    value={parseInt(searchState.size)}
                    onChange={onChangeSize}
                    name={"size"}>
                    <option value={20}>20개씩 보기</option>
                    <option value={30}>30개씩 보기</option>
                    <option value={50}>50개씩 보기</option>
                </select>
            </section>
        </div>
    );
}

export default SearchBar;