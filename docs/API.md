# API Markdown

This document is here to list every single request you can make to the server using the provided PostRequest and GetRequest functions located in `Requests.tsx`. 

This provides **full** documentation of each request in its entirety, including what information it needs to send, any queries, and all the other fun stuff you might want and/or need to use the api calls correctly for the backend. 

Creating new api calls is simple. 

Use `requireAuth` to require authentication before using any new API calls you create. You must list each call with `/server/your-request-here`, and you can add queries by simply making your request have a `?var=var` in it on the client side. Queries are automatically handled on the server.

Review `server.js` for cookies and session handling, as that is where sessions are appropriately handled. 

