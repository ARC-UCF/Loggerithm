// We'll be adding more to this code when more fields on sites need to be updated.
import { useEffect } from "react";

export function UpdatePageTitle(title: string) { // Basic function to update page title.
    useEffect(() => {
        document.title = title;
    }, [title]);
}