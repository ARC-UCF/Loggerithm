import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hIndex } from "./HelpIndex";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";

export default function HelpSurface() {
    UpdatePageTitle("Help | Loggerithm");

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const filtered = hIndex.filter((item) => {
        if (!query.trim()) return true;

        const text = 
            item.title + 
            " " +
            item.description +
            " " +
            item.keywords.join(" ");
        
        return text.toLowerCase().includes(query.toLowerCase());
    });

    const grouped = filtered.reduce((acc, item) => {
        const key = item.category || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<string, typeof hIndex>);

    return (
        <div className="helpbox">
            <h1>Help Documentation</h1>
            <p>This page includes all the help documentation for using this software, as well as for doing logging, making HF contacts, and other relevant documentation for doing high frequency logging and operations.</p>
            <p>Make search queries using the provided search box, which queries based on page title and page context.</p>

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
        </div>
    );
}