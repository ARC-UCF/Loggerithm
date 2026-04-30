type Props = {
    headings: {
        id: string,
        text: string,
        level: number,
    }[];
};

export default function TableOfContents({ headings }: Props) {
    return (
        <div className="tableofcontents">
            <h2>Table of Contents</h2>
            <ul>
                {headings.map((h) => (
                    <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 12}px` }}><a href={`#${h.id}`} aria-label={h.text}>{h.text}</a></li>
                ))}
            </ul>
        </div>
    )
}