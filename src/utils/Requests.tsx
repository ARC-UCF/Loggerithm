// A helper module to submit API calls to the backend
// This will probably eventually include websocket connections to push live updates where needed

const link = "/server"; // !!! This link is a proxy. Configure the listening port in vite.config.ts. !!!

type CredentialsOption = RequestCredentials;

function buildHeaders(token?: string): HeadersInit {
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}`} : {}),
    };
}

export async function PostRequest(route: any, info: Record<string, unknown> = {}, token?: string, credentials: CredentialsOption = "same-origin") {
    try {
        // Piecing the link + route together from the page it was submitted to create the api call.

        // Do need to make info be a dict type instead of an any. Do try to make your requests be a dict.

        const res = await fetch(`${link}${route}`, {
            method: "POST",
            credentials: credentials,
            headers: buildHeaders(token),
            body: JSON.stringify(info),
        });

        let data: unknown; // We'll safely parse the data to make sure we get a response.
        const text = await res.text();
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }
        
        return {ok: true, status: res.status, data};
    } catch (err: any) { // Catch any errors and return the error.
        return {ok: false, status: 0, error: err instanceof Error ? err.message : err};
    }
}

// Send get requests to the backend, particularly for checking call databases and what not.

export async function getRequest(route: any, token?: string, credentials: CredentialsOption = "same-origin") {
    try {
        const res = await fetch(`${link}${route}`, {
            method: "GET",
            credentials: credentials,
            headers: buildHeaders(token),
        });

        if (!res.ok) { // If the API errors, throw an error.
            throw new Error("Error when fetching request")
        }

        let data: unknown;
        const text = await res.text();
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }

        if (!res.ok) {
            return {ok: false, status: res.status, data};
        }
        
        return {ok: true, status: res.status, data};
    } catch (err: any) { // Catch any errors and return the error.
        return {ok: false, status: 0, error: err instanceof Error ? err.message : err};
    }
}