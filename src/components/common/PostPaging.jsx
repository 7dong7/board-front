// css
import "./PostPaging.css";


const PostPaging = ( {postPage, pageNumbers, handlePageChange}) => {
    return (
        <div className={"PostPaging"}>
            <button
                onClick={() => handlePageChange(parseInt(postPage.currentPage) - 1)}
                disabled={postPage.currentPage === 0}
            >
                이전
            </button>
            {pageNumbers.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={String(pageNum) === String(postPage.currentPage) ? 'active' : 'delete'}
                >
                    {pageNum} {/* 페이지 UI 번호 */}
                </button>
              ))
            }
            <button
                onClick={() => handlePageChange(parseInt(postPage.currentPage) + 1)}
                disabled={postPage.currentPage >= postPage.totalPages}
            >
                다음
            </button>
        </div>
    );
}

export default PostPaging;