
const PostPaging = ( {postPage, handlePageChange}) => {

    console.log(postPage.currentPage);
    return (
        <div>
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
        </div>
    );
}

export default PostPaging;