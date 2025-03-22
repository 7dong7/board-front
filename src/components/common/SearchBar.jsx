// css
import "./SearchBar.css"

const SearchBar = ( {onChangeState, searchPost} ) => {

    const onChangeSearchParams = (e) => {
        onChangeState(e)
    }

    const searchHandler = () => {
        searchPost();
    }

    return (
        <div className={"SearchBar"}>
            <section className={"section-left"}>
                <select
                    name={"type"}
                    onChange={onChangeSearchParams}>
                    <option value={"title"}>제목</option>
                    <option value={"nickname"}>작성자</option>
                    <option value={"content"}>내용</option>
                    <option value={"title_content"}>제목+내용</option>
                </select>

                <input
                    onChange={onChangeSearchParams}
                    name={"searchWord"}
                    placeholder={"검색어 입력"} />

                <button onClick={searchHandler}>찾기</button>
            </section>

            <section className={"section-right"}>
                <select
                    onChange={onChangeSearchParams}
                    name={"searchSize"}>
                    <option value={20}>20개씩 보기</option>
                    <option value={30}>30개씩 보기</option>
                    <option value={50}>50개씩 보기</option>
                </select>
            </section>
        </div>
    );
}

export default SearchBar;