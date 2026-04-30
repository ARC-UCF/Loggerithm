import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import TableOfContents from "../Components/TableOfContents";
import { hIndex } from "../Pages/HelpIndex";
import ScrollToTop from "../Components/ScrollToTop";

export default function HelpPageLayout() {
    <ScrollToTop />

    const contentRef = useRef<HTMLDivElement>(null);
    const [headings, setHeadings] = useState<Heading[]>([]);

    const location = useLocation();

    const match = hIndex.find(
        (item) => item.path === location.pathname
    );

    const title = match?.title || "Help";

    useEffect(() => {
        if (!contentRef.current) return;

        const elements = contentRef.current.querySelectorAll("h1, h2, h3, h4");
        const newHeadings: Heading[] = [];

        elements.forEach((el) => {
            const id = el.id || el.textContent?.replace("\/s+/g", "-").toLowerCase() || "";
            el.id = id;

            newHeadings.push({
                id, 
                text: el.textContent || "",
                level: Number(el.tagName.replace("H", ""))
            });
        });

        setHeadings(newHeadings);
    }, []);


    return (
        <div className="helpmain" ref={contentRef}>
            <p><Link to="/help">Return to Help</Link></p>
            <h1>{title}</h1>

            <TableOfContents headings={headings} />

            <div className="helpcontent">
                <Outlet />
            </div>
        </div>
    );
}