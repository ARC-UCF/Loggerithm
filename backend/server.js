import dotenv from "dotenv";
dotenv.config({ path: "secrets.env" });

import express from "express";
import cors from "cors";
import session from "express-session";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";
import { writeFieldDayLog, writeNormalLog, writePOTALog } from "./database/data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger_version = "v0.1.0";
const app = express();

let sessionStore;

const csv_link = "https://pota.app/all_parks_ext.csv"; {/* The link we shall use to download the CSV for reference. */}
const filePath = path.join(__dirname, "database", "parks.csv");

const activeUsers = new Map(); 
const operatorStates = new Map();
const parkMap = new Map();

// CSV yippee!!

async function fileExists(filepath) {
    try {
        await fs.access(filepath);
        return true;
    } catch {
        return false;
    }
}

function downloadCSV(url, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);

        const options = {
            // A user agent is required to access the site to download the csv. Without it, you get a 403 error.
            headers: {
              "User-Agent": "Mozilla/5.0",
              "Accept": "text/csv,application/octet-stream;q=0.9,*/*;q=0.8"
            }
        };

        https.get(url, options, (res) => { // This will attempt to get the file and will error if it can't.
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to get file: ${res.statusCode}`));
                return;
            }

            res.pipe(file);

            file.on("finish", (err) => { 
                file.close(resolve); // Resolve
            });
        }).on("error", (err) => { // Runs if an error occurs.
            fs.unlink(outputPath, () => reject(err));
        });
    });
}

function loadCSV(filepath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filepath) // This code reads the csv file and catches errors.
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
}

async function downloadAndRun() {
    console.log("Running");

    // Will update this code later to include error catching to prevent complete shut down of the system. Would recommend a download of the csv file when you have access to the internet.

    if (await fileExists(filePath)) { // Check if the path exists
        console.log("File exists"); // It does, so we'll log it in the console
    } else {
        console.log("Downloading file"); // It doesn't, so we'll proceed to try and download it.
        await downloadCSV(csv_link, filePath);
    }

    console.log("Reading file."); 
    const parks = await loadCSV(filePath); // Read the file

    parks.forEach(p => parkMap.set(p.reference, p)); // For each entry, load the park reference number as the primary key, and then add the rest of the information, like coordinates and grid squares, to the list of parks in the park map.

    console.log("Table created."); // Log

    console.log("CSV downloaded"); // Confirm CSV download and read
}

app.use(cors({ // The location the server sends requests back to.
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json()); // Express

app.use( // This creates the session tracker on the backend which will issue cookies to clients to keep track of who's who.
    // Cookies are not persistent. If the server shuts down, all previous cookies will be invalidated. This is by design.
    session({
        name: "loggerithm.sid",
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 48 // 2 days or 48 hours
        },
    })
);

// 48 hours should be long enough to incldue the duration of Field Day and other longer events. Will lengthen if needed.

app.use((req, res, next) => { // Gets the session store for use elsewhere in the code.
    if (!sessionStore) {
        sessionStore = req.sessionStore;
    }
    next();
});

function requireAuth(req, res, next) { // Use for any API calls requiring authentication. Anyone not authenticated will not be able to access several of the api calls.
    if (!req.session.user) { 
        return res.status(401).json({ error: "Not logged in" });
    }
    next();
}

app.get("/server/check-call", (req, res) => { // Check callsign request, which uses a query.
    console.log("Got call");
    const { callsign } = req.query; // Get the query.

    if (!callsign) {
        console.log("No callsign was provided.");
        res.status(404).json({ error: "No callsign was provided" });
    }

    for (const user of activeUsers.values()) {
        if (user.username === callsign) {
            res.status(200).json({ message: "User was found in active sessions" });
            console.log("Was able to find active user session.");
            return;
        }
    }

    console.log("Unable to find user in active user sessions.");
    res.status(404).json({ error: "Callsign was not found in active users" });
});

app.get("/server/me", requireAuth, (req, res) => { // Gets the user.
    res.json(req.session.user);
});
 
app.post("/server/logout", requireAuth, (req, res) => { // Allows the user to terminate their session if they so desire, and deletes the cookie stored on their device.
    // This is good if you want to switch users.
    // Note that this requires auth. You shouldn't be able to logout if you've not been previously authenticated.
    const sessionId = req.sessionID;
    const username = req.session?.user?.call;

    if (sessionId) { // Check if the session exists, delete cookies/sessions if it does.
        activeUsers.delete(sessionId);
        operatorStates.delete(sessionId);
    }

    req.session.destroy((err) => { // Delete the requested user's session.
        if (err) {
            return res.status(500).json({ error: "Failed to logout" }); // Occurs if unable to delete.
        }

        res.clearCookie("loggerithm.sid"); // Name of the cookie.

        res.status(200).json({ message: "Logged out" }); // Confirm logout.
    });
});

app.post("/server/login", (req, res) => { // Login request.

    const { call } = req.body; // Get the callsign of the requested login.

    if (!call) { // Confirm it was not left blank.
        res.status(400).json({ error: "Username required" });
        return;
    }

    for (const user of activeUsers.values()) { // Check each callsign already in use, and then send an error if it is.
        if (user.username === call) { // User.username and call are interchangable. Variable changes based on what you're using.
            return res.status(409).json({ error: "Callsign already in use" }); // Send a 409 error.
        }
    }

    req.session.user = { // Create the session.
        call,
    };

    activeUsers.set(req.sessionID, { // Set the session in active users.
        username: call,
        lastSeen: Date.now(),
    });

    res.status(200).json({ message: "Logged in successfully" }); // Confirm login.
});

app.post("/server/update-operator-state", requireAuth, (req, res) => { // This is used to update an operator's state on the backend.
    const { mode, band, radio, power, active } = req.body;  

    const call = req.session.user.call; // Get the user's session.

    if (!mode) {
        res.status(400).json({ error: "A mode is required" }); // Users need to have a mode set
    }

    if (!band) {
        res.status(400).json({ error: "A band is required" }); // Users need to have a band set
    }

    if (!power) {
        res.status(400).json({ error: "TX power is required" }); // Users need to have their power set
    }

    // All the rest of the information can be ignored/be left as null because it isn't pertinent.

    const newState = { // Build the state.
        call,
        radio,
        mode,
        band,
        power,
        active,
        lastUpdated: Date.now(),
    };

    req.session.operator = newState; // Add the state to the operator's session.

    operatorStates.set(req.sessionID, newState); // Set the operator in operator states.

    res.status(200).json({ message: "Successfully updated operator" }); // Confirm update.
});

app.get("/server/operator", requireAuth, (req, res) => { // Get the user's operator state. Will return null if none exists.
    res.status(200).json(req.session.operator || {});
});

app.get("/server/operators", requireAuth, (req, res) => { // Get a list of all active operators and their states.
    res.status(200).json(Array.from(operatorStates.values()));
});

app.post("/server/submit-pota-log", requireAuth, (req, res) => { // Submit a POTA log to the backend.
    const { callsign, activations, station, radio, power, type, contact, mode, band, frequency, contactparks, rstsent, rstreceive, state, comments } = req.body;

    if (type !== "pota") { // Confirm the type is POTA.
        res.status(400).json({ error: "Invalid submission type for this log" });
        return;
    }

    if (!contact) {
        res.status(400).json({ error: "Please provide the callsign of the person you've contacted" });
        return;
    }

    if (!power) {
        res.status(400).json({ error: "Please provide your TX power" });
        return;
    }

    if (!frequency) {
        res.status(400).json({ error: "Please provide the frequency of the contact" });
        return;
    }

    if (!rstsent || !rstreceive) {
        res.status(400).json({ error: "Please provide a signal report you sent/received" });
        return;
    }

    const parks = activations.split(",").map(s => s.trim()).filter(Boolean); // Split the entered park activations by the user.

    if (!parks) { // Confirm the parks entered are not null.
        res.status(400).json({ error: "You are required to activate at least one park" }); // Error if no parks were entered.
        return;
    }

    for (const [park] in parks.entries()) { // Look through the entries of parks, then filter.
        if (!parkMap.has(park)) { // Check each park to make sure it exists.
            res.status(400).json({ error: "You have submitted an invalid park" }); // If it doesn't, send a 400 error.
            return;
        } else { 
            console.log(`${park} exists in the list of references`);
        }
    };

    if (contactparks) { // Check if the user submitted contact parks.
        conparks = contactparks.split(",").map(s = s.trim()).filter(Boolean); // Split

        for (const [cpark] in conparks.entries()) { // Check each park to make sure it exists.
            if (!parkMap.has(cpark)) {
                res.status(400).json({ error: "The park you listed for the contact does not exist" }); // Send a 400 error if the park does not exist.
                return;
            } else {
                console.log(`${cpark} exists in the list of references`); 
            }
        };
    }

    writePOTALog(callsign, activations, station, power, radio, type, contact, mode, band, frequency, contactparks, rstsent, rstreceive, state, comments);

    res.status(200).json({ message: "Uploaded log successfully" });
});

app.post("/server/submit-normal-log", requireAuth, (req, res) => {
    const { callsign, station, radio, power, type, contact, mode, band, frequency, rstsent, rstreceive, comments } = req.body;

    if (!type || type !== "normal") {
        res.status(400).json({ error: "Type is not valid for this log submission" });
        return;
    }

    if (!power) {
        res.status(400).json({ error: "TX power must be provided" });
        return;
    }

    if (!contact) {
        res.status(400).json({ error: "A contact callsign must be added" });
        return;
    }

    if (!frequency) {
        res.status(400).json({ error: "You must provide a frequency for this contact" });
        return;
    }

    if (!rstsent) {
        res.status(400).json({ error: "You must provide a signal report sent" });
        return;
    }

    if (!rstreceive) {
        res.status(400).json({ error: "You must provide a signal report receieved" });
        return;
    }

    writeNormalLog(callsign, station, radio, power, type, contact, mode, band, frequency, rstsent, rstreceive, comments);

    res.status(200).json({ message: "Successfully wrote log" });
});

app.post("/server/submit-field-day-log", requireAuth, (req, res) => {
    const { callsign, station, radio, power, type, contact, mode, band, frequency, region, ops, comments } = req.body;

    if (!type || type !== "field-day") {
        res.status(400).json({ error: "Invalid log submission type for this log" });
        return;
    }

    if (!power) {
        res.status(400).json({ error: "TX power must be provided" });
        return;
    }

    if (!contact) {
        res.status(400).json({ error: "A contact callsign must be added" });
        return;
    }

    if (!frequency) {
        res.status(400).json({ error: "You must provide a frequency for this contact" });
        return;
    }

    if (!mode) {
        res.status(400).json({ error: "You must provide a mode for this contact" });
        return;
    }

    if (!band) {
        res.status(400).json({ error: "You must provide a valid band type for this contact" });
        return;
    }

    if (!region) {
        res.status(400).json({ error: "You must provide a region for this contact" });
        return;
    }

    if (!ops) {
        res.status(400).json({ error: "You must provide the number of operators for this contact" });
        return;
    }

    writeFieldDayLog(callsign, station, radio, power, type, contact, mode, band, frequency, region, ops, comments);

    res.status(200).json({ message: "Successfully submitted your log" });
});

app.post("/server/update-csv", requireAuth, (req, res) => { // Send a update csv request to the server.
    if (parkMap.entries()) {
        res.status(400).json({ error: "The function has already been run." }); // Should the backend already be setup, don't run.
        return;
    }

    try {
        downloadAndRun(); // Will run the download and run function.
 
        res.status(200); // 200 if it works.
    } catch {
        res.status(400); // 400 if it doesn't.
    }
})

app.get("/server/active-users", requireAuth, (req, res) => { // Get a list of all active users in the session.
    res.status(200).json(Array.from(activeUsers.values()));
});

app.use((req, res, next) => { // Update users's last seen time based on when they last submitted an API request.
    if (req.session?.user) {
        activeUsers.set(req.sessionID, {
            username: req.session.user.call,
            lastSeen: Date.now(),
        });
    }
    next();
});

setInterval(() => { // Delete logic for old stuff is here.
    if (!sessionStore) return;

    for (const [sessionId, user] of activeUsers.entries()) {
        sessionStore.get(sessionId, (err, session) => {
            if (err || !session) {
                activeUsers.delete(sessionId);
            }
        });
    };

    for (const [sessionId, operator] of operatorStates.entries()) {
        sessionStore.get(sessionId, (err, session) => {
            if (err || !session) {
                operatorStates.delete(sessionId);
            }
        });
    }
}, 1000 * 60); // Runs every minute. Mostly real-time.

app.listen(3000, () => { // The location the server listens to.
    console.log("Server running on http://localhost:3000");
    console.log(`Loggerithm operating on ${logger_version}`)
});