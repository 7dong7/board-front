// css
import "./Paging.css";


const Paging = ( {page, pageNumbers, handlePageChange}) => {

    return (
        <div className={"Paging"}>
            <button
                onClick={() => handlePageChange(1)}
            >
                처음
            </button>
            <button
                onClick={
                    () => page.currentPage
                        ? handlePageChange(parseInt(page.currentPage) - 1)
                        : handlePageChange(parseInt(page.number) + 1 - 1)}
            >
                이전
            </button>
            {
                pageNumbers &&
                pageNumbers.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={String(pageNum) === (page.currentPage ? String(page.currentPage) : String(parseInt(page.number) + 1))
                            ? 'active'
                            : ''}
                    >
                        {pageNum} {/* 페이지 UI 번호 */}
                    </button>
                ))
            }
            <button
                onClick={() => page.currentPage
                    ? handlePageChange(parseInt(page.currentPage) + 1)
                    : handlePageChange(parseInt(page.number) + 1 + 1)}
            >
                다음
            </button>

            <button
                onClick={() => handlePageChange(parseInt(page.totalPages))}
            >
                마지막
            </button>
            <div>

            </div>
        </div>
    );
}

export default Paging;