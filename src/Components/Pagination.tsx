type Props = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center"}}>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Prev
            </button>

            <span>
                {currentPage} / {totalPages}
            </span>

            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
}