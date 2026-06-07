# Loggerithm v1.0.0

## Contents

- [Summary](#summary)
- [Setup Guide](#setup)
    - [Required](#required)
    - [Separate the Backend and Frontend](#separate-the-backend-and-frontend)
- [Project Information](#project-information)
    - [Archive](#-archive)
    - [CSS](#css)
- [Backend](#backend)
    - [API](#api)
- [License](#license)

## Summary

This project is a website designed to be hosted on a small Pi server for field operations. This is developed for the Amateur Radio Club at the University of Central Florida. This will include a small backend, which is noted in the `/backend` portion of this, which should be used on your Pi server. The pi server needs to have a local WiFi connection to communicate to devices who can upload, download, and edit logs on the backend. The backend will serve all information regarding the logs and related information.

The backend uses Nodejs and Expressjs to function. It also relies on ports for the API calls. Since this is somewhat dynamic, React is used, at least for future versions of this project. Websockets will eventually be implemented for live updating.

Providers (such as the ModalProvider, AppProvider, and ToastProvider) are used to create either global variables or components which can be displayed above any other element on any of the pages, hence why their z-indexes are 1000 for the ModalProvider and 1200 for the ToastProvider. Both are ui contexts which provide information to the frontend user and allow the user to submit information (such as setting their global information, ie. station callsign).

The `App.tsx` is the route manager, which allows linking to different pages on the site. The logging page uses a setview state to display pages within the page, without redirecting you to a different page. This is primarily because that would get annoying. Any pages which set component state will not save upon refresh, this is something you should be aware of.

Users are required to enter their personal callsign to use any of the logging features. This is also required so that the user can be synced to the server. The user's callsign, plus operator state, is saved to localstorage and is thus persistent to their device. As long as you don't switch devices, whatever you inputted will remain the same. And as long as the domain does not change.

> [!NOTE]
> This project is in development, and subject to change.
>
> v1.0.0 is released, but subsequent updates to this project will occur. Please use any updates this project makes.

> [!WARNING]
> This is a basic minimum-functioning project, as of v1.0.0
>
> This is NOT the final nor complete product, and this minimum product will be updated in the future to allow for more features.

> [!WARNING]
> Contacts does not currently have pagination.

> [!WARNING]
> Not all help pages are currently functional.

## SETUP

### REQUIRED

You must make a .env file on the backend with the name `secrets.env`. Inside of it, you must create a variable called `SESSIONSECRET`, and you must create a token for that session secret. 

You can create a simple token for your backend by running this in your command line and copy/pasting the following output into your .env file:

```js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This is secure enough for the fact that this is meant to be locally hosted on your server. 

### Separate the Backend and Frontend

> [!IMPORTANT]
> Please read this section and follow the instructions provided. It is essential to make the software work.

You need to separate the backend files of this project from the frontend files. Place the backend and frontend files on your host device. You can deploy the website using `npm run build`, which will build the website. You will then need to initialize the server via `node server.js`. 

Further, you will need to specify where the server is located. Change the port in both the backend and frontend. You can change the port in the backend by opening up `server.js` and scrolling to the bottom, where `app.listen` is located. Change the number to the port number you wish to use. You will need to do this in `vite.config.ts`, where you will change the port accordingly. Once this is completed, clients will be able to talk to the server.

Remember to keep `secrets.env` with the backend.

## Project Information

### !! Archive

The `archive` folder located in `src` is components and features which were developed for a different idea of the project, but kept as they may become useful later, or are good references. Feel free to look at the code in that folder.

### CSS 

All CSS is dictated by app.scss. All variables which are used are located in variables.scss. 

## Backend

The backend hosts the database and API information, which is used to keep everyone in sync, as well as provide contact checking (to make sure you've not contacted a person before), as well as check information, determine who is on what band, and then subsequently display that information to the users.

The current plan is to implement Websockets to the backend to make it update live in real-time. 

### API

API documentation has been moved to `/docs/API.md`. Please go there to review API information.

## License

Please refer to `LICENSE.md` for the license for this project.