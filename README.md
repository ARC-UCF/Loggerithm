# Loggerithm v0.1.0

## Contents

- [Setup Guide](#setup)
    - [Required](#required)
- [Project Information](#project-information)
    - [Archive](#-archive)
    - [CSS](#css)
- [Backend](#backend)
    - [API](#api)
- [License](#license)


This project is a website designed to be hosted on a small Pi server for field operations. This is developed for the Amateur Radio Club at the University of Central Florida. This will include a small backend, which is noted in the `/backend` portion of this, which should be used on your Pi server. The pi server needs to have a local WiFi connection to communicate to devices who can upload, download, and edit logs on the backend. The backend will serve all information regarding the logs and related information.

The backend uses Nodejs and Expressjs to function. It also relies on ports for the API calls. Since this is somewhat dynamic, React is used, at least for future versions of this project. Websockets will eventually be implemented for live updating.

Providers (such as the ModalProvider, AppProvider, and ToastProvider) are used to create either global variables or components which can be displayed above any other element on any of the pages, hence why their z-indexes are 1000 for the ModalProvider and 1200 for the ToastProvider. Both are ui contexts which provide information to the frontend user and allow the user to submit information (such as setting their global information, ie. station callsign).

The `App.tsx` is the route manager, which allows linking to different pages on the site. The logging page uses a setview state to display pages within the page, without redirecting you to a different page. This is primarily because that would get annoying. 

Users are required to enter their personal callsign to use any of the logging features. This is also required so that the user can be synced to the server. The user's callsign, plus operator state, is saved to localstorage and is thus persistent to their device. As long as you don't switch devices, whatever you inputted will remain the same. And as long as the domain does not change.

> [!NOTE]
> This project is in development, and subject to change.
>
> v0.1.0 is not yet released. Frequent updates are occurring to this project. Please refer to the releases section of this GitHub for any official releases.

## SETUP

### REQUIRED

You must make a .env file on the backend with the name `secrets.env`. Inside of it, you must create a variable called `SESSIONSECRET`, and you must create a token for that session secret. 

You can create a simple token for your backend by running this in your command line and copy/pasting the following output into your .env file:

```js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This is secure enough for the fact that this is meant to be locally hosted on your server. 

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