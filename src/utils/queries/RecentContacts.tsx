import { useQuery } from "@tanstack/react-query";
import { getRecentConctacts } from "../reqs/GetRecentContacts";
import { useToast } from "../../Components/ToastProvider";

export function RecentContacts() { // This lets us use a query and automatically handle all the web stuff.
    const { notify } = useToast();

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["recentContacts"],
        queryFn: getRecentConctacts,
        refetchInterval: 5000, // Poll interval of five seconds, near real-time
    });

    if (isLoading) {
        return <p>Fetching...</p> // Return this if loading
    }

    if (error) {
        notify("An error occurred while fetching recent QSOs");
        return <p>Something went wrong...</p> // Return this if an error occurred
    }

    return ( // Return this if successful
        <>
        
        </>
    )
}