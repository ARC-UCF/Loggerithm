import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hIndex } from "./HelpIndex";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";
import Pagination from "../Components/Pagination";
import ScrollToTop from "../Components/ScrollToTop";

export default function HelpSurface() {
    UpdatePageTitle("Help | Loggerithm");
    ScrollToTop();

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const filtered = hIndex.filter((item) => {
        if (!query.trim()) return true;

        const text = 
            item.title + 
            " " +
            item.description +
            " " +
            item.category +
            " " +
            item.keywords.join(" ");
        
        return text.toLowerCase().includes(query.toLowerCase());
    });

    const ITEMS_PER_PAGE = 50;
    const [currentPage, setCurrentPage] = useState(1);

    const params = new URLSearchParams(window.location.search);
    const initialPage = Number(params.get("page")) || 1;

    const paginatedSource = filtered;

    const totalPages = Math.ceil(paginatedSource.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentItems = paginatedSource.slice(startIndex, endIndex);

    const grouped = currentItems.reduce((acc, item) => {
        const key = item.category || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string, typeof hIndex>);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    return (
        <div className="helpbox">
            <h1>Help Documentation</h1>
            <p>This page includes all the help documentation for using this software, as well as for doing logging, making HF contacts, and other relevant documentation for doing high frequency logging and operations.</p>
            <p>You may use the search box to search through all of the available help pages. Searches will index the tags, title, description, and category of the page.</p>

            <input
                type="text"
                placeholder="Search"
                aria-label="Search help pages"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="pagesholder">
                {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="categoryholder">
                    {items.map((item) => (
                    <div key={item.path} onClick={() => navigate(item.path)} className="pageinformation">
                        <div className="categoryheader"><b>Category:</b> {category}</div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="keywords"><b>Keywords:</b> {item.keywords.join(", ")}</div>
                    </div>
                    ))}
                </div>))}
            </div>
            {<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </div>
    );
}