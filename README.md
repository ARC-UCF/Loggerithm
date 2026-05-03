# Loggerithm v1

This project is a website designed to be hosted on a small Pi server for field operations. This is developed for the Amateur Radio Club at the University of Central Florida. This will include a small backend, which is noted in the `/backend` portion of this, which should be used on your Pi server. The pi server needs to have a local WiFi connection to communicate to devices who can upload, download, and edit logs on the backend. The backend will serve all information regarding the logs and related information.

The backend uses Nodejs and Expressjs to function. It also relies on ports for the API calls. Since this is somewhat dynamic, React is used, at least for future versions of this project. Websockets will eventually be implemented for live updating.

Providers (such as the ModalProvider, AppProvider, and ToastProvider) are used to create either global variables or components which can be displayed above any other element on any of the pages, hence why their z-indexes are 1000 for the ModalProvider and 1200 for the ToastProvider. Both are ui contexts which provide information to the frontend user and allow the user to submit information (such as setting their global information, ie. station callsign).

The `App.tsx` is the route manager, which allows linking to different pages on the site. The logging page uses a setview state to display pages within the page, without redirecting you to a different page. This is primarily because that would get annoying. 

Users are required to enter their personal callsign to use any of the logging features. This is also required so that the user can be synced to the server. The user's callsign, plus operator state, is saved to localstorage and is thus persistent to their device. As long as you don't switch devices, whatever you inputted will remain the same. And as long as the domain does not change.

## !! Archive

The `archive` folder located in `src` is components and features which were developed for a different idea of the project, but kept as they may become useful later, or are good references. Feel free to look at the code in that folder.

## CSS 

All CSS is dictated by app.scss. All variables which are used are located in variables.scss. 

## Backend

The backend hosts the database and API information, which is used to keep everyone in sync, as well as provide contact checking (to make sure you've not contacted a person before), as well as check information, determine who is on what band, and then subsequently display that information to the users.

The current plan is to implement Websockets to the backend to make it update live in real-time. 

### API

The frontend components can send requests (such as POST and GET) to the backend via the `Requests.tsx` utility. This was made to streamline the process of getting data from the backend. 

Use `PostRequest` for post requests to the backend, which will return an `err` if an error occurs or will return the response and data if the request is ok. It is recommended to wrap the function itself in a `try` even though there is a `try` implemented into the function itself, in the case the function errors.

You can also use `getRequest` to make a get request to the backend, which functions the same way as `PostRequest`. Again, wrap the function in a `try` to catch errors. An example is provided in `CallsignPrompt.tsx`.

To show any API errors to the user, use the `{ notify }` function of the `useToast()` component provided by the `ToastProvider`. 

**Return**

When you use **PostRequest** or **getRequest**, the information will come back with three fields:

* `ok: false || true`
* `status: integer`
* `data: {}`

If `ok` is false then an error occurred while attempting to run the code, and it didn't execute correctly.

`status` is based off of the status the server sends back. `status` will be 0 **IF** `ok` is false. Which, again, will only occur if there was an error in executing the code.

Therefore, use `ok` to make sure the process sent correctly and returned correctly, then use `status` to determine the state of the request. 

`data` will contain an `error` message if there is any sort of error sent back by the server, otherwise it will contain `message` for successful requests, as well as other data depending on the request.

Using `data` currently causes an error with the TypeScript, and it's currently best to just ignore it.

**GET Requests**

* `/server/check-call?callsign=${callsign}` - GET - Check Callsign - Check the state of the callsign on the backend.
* `/server/park?park=${park}` - GET - Get the information related to a POTA park using the park's identifier (eg. US-4036).
* `/server/get-ver` - GET - Get the current version of Loggerithm.
* `/server/me` - GET - Returns the client's user information on the server.
* `/server/operator` - GET - Returns the client's operator state, `null` if none exists.
* `/server/operators` - GET - Returns all active operators.
* `/server/active-users` - GET - Returns all active users.


**POST Requests**

* `/server/login` - POST - Params: `{ call: string }` - Logs the user into the server, which records them as active. Also grants the user a cookie for a session id on the server to recognize the client and grant access to requests which require authentication.
* `/server/loguout` - POST - No params - Logs the user out of their session by deleting their active session, which removes them from active users and active operators, as well as deletes their cookie.
* `/server/update-operator-state` - POST - Params: `{ mode: string, band: string, radio: string, power: string, active: "yes" || "no"}` - Update the client's operator state on the server, to reflect it to the other clients.
* `/server/submit-pota-log` - POST - Params: `{ callsign: string, station: string, power: string, type: "pota" || "normal" || "field day", contact: string, frequency: string, parks?: string, rstsent: string, rstsent: string, state: string, comments: string }` - Submit a POTA log to the backend. Will return 400 if `type` is not `pota`.