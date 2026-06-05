import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
    const blocker = useBlocker(hasUnsavedChanges);

    // This is a helper component used to prevent window refreshes + changes internally when a form is being worked on and has not been submitted. 
    // Plan is to implement this eventually.

    useEffect(() => { // React's blocker API, prevents window changes.
        if (blocker.state === "blocked") {
            const confirmed = window.confirm(
                "Leaving this page will reset your data. Are you sure you want to leave?"
            );

            if (confirmed) {
                blocker.proceed(); // Proceed if confirmed
            } else {
                blocker.reset(); // Reset is not confirmed
            }
        }
    }, [blocker]);

    useEffect(() => { // Built-in window unload event handler.
        const handleBeforeUnload = (event) => { // Listen for event
            if (!hasUnsavedChanges) {
                return;
            }

            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload); // Listener

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload); // Remove listener
        };
    }, [hasUnsavedChanges]); // Hook
}