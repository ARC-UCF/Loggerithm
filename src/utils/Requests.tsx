// A helper module to submit API calls to the backend
// This will probably eventually include websocket connections to push live updates where needed

const link = "/server"; // !!! This link is a proxy. Configure the listening port in vite.config.ts. !!!

export async function PostRequest(route: any, info: Record<string, string>, method: string, credentials: any) {
    try {
        // Piecing the link + route together from the page it was submitted to create the api call.

        // Do need to make info be a dict type instead of an any. Do try to make your requests be a dict.

        const res = await fetch(`${link}${route}`, {
            method: method,
            credentials: credentials,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        });

        const data = await res.json();

        return {res: res, data: data};
    } catch (err: any) { // Catch any errors and return the error.
        return err;
    }
}

// Send get requests to the backend, particularly for checking call databases and what not.

export async function getRequest(route: string) {
    try {
        const res = await fetch(`${link}${route}`);

        if (!res.ok) { // If the API errors, throw an error.
            throw new Error("Error when fetching request")
        }

        const data = await res.json();

        return {res: res, data: data}; // Submitting our parameters with a dict.
    } catch (err: any) {
        return err;
    }
}