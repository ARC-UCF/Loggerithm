import { useState } from "react";

export function usePagination(totalItems: number, itemsPerPage: number = 15) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    function next() {
        setCurrentPage((p) => Math.min(p + 1, totalPages));
    }

    function prev() {
        setCurrentPage((p) => Math.max(p - 1, 1));
    }

    function goTo(page: number) {
        const safePage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(safePage);
    }

    return {
        currentPage,
        totalPages,
        startIndex,
        endIndex,
        next,
        prev,
        goTo,
    };
}