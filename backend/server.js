import dotenv from "dotenv";
dotenv.config({ path: "secrets.env" });

import express from "express";
import cors from "cors";
import session from "express-session";

const logger_version = "v1.0.0"
const app = express();

let sessionStore;

const csv_link = "https://pota.app/all_parks_ext.csv"; {/* The link we shall use to download the CSV for reference. */}

const activeUsers = new Map(); 
const operatorStates = new Map();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
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

app.use((req, res, next) => {
    if (!sessionStore) {
        sessionStore = req.sessionStore;
    }
    next();
});

function requireAuth(req, res, next) {
    if (!req.session.user) { 
        return res.status(401).json({ error: "Not logged in" });
    }
    next();
}

app.get("/server/check-call", (req, res) => {
    console.log("Got call");
    const { callsign } = req.query;

    if (!callsign) {
        console.log("No callsign was provided.");
        res.status(404).json({ error: "No callsign was provided" });
    }

    if (callsign) {
        res.status(200).json({ message: "User was found!", callsign: callsign});
    }
});

app.get("/server/me", requireAuth, (req, res) => {
    res.json(req.session.user);
});

app.post("/server/logout", requireAuth, (req, res) => {
    const sessionId = req.sessionID;
    const username = req.session?.user?.call;

    if (sessionId) {
        activeUsers.delete(sessionId);
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to logout" });
        }

        res.clearCookie("loggerithm.sid");

        res.status(200).json({ message: "Logged out" });
    });
});

app.post("/server/login", (req, res) => {

    const { call } = req.body;

    if (!call) {
        res.status(400).json({ error: "Username required" });
        return;
    }

    for (const user of activeUsers.values()) {
        if (user.username === call) {
            return res.status(409).json({ error: "Callsign already in use" });
        }
    }

    req.session.user = {
        call,
    };

    activeUsers.set(req.sessionID, {
        username: call,
        lastSeen: Date.now(),
    });

    res.status(200).json({ message: "Logged in successfully" });
});

app.post("/server/update-operator-state", requireAuth, (req, res) => {
    const { mode, band, radio, power, active } = req.body;

    const call = req.session.user.call;

    const newState = {
        call,
        radio,
        mode,
        band,
        power,
        active,
        lastUpdated = Date.now(),
    };

    req.session.operator = newState;

    operatorStates.set(req.sessionID, newState);

    res.status(200).json({ message: "Successfully updated operator" });
});

app.get("/server/operator", requireAuth, (req, res) => {
    res.status(200).json(req.session.operator || {});
});

app.get("/server/operators", requireAuth, (req, res) => {
    res.status(200).json(Array.from(operatorStates.values()));
});

app.post("/server/submit-pota-log", requireAuth, (req, res) => {
    const { callsign, station, power, type, contact, frequency, parks, rstsent, rstreceive, state, comments } = req.body;

    if (type !== "pota") {
        res.status(400).json({ error: "Invalid submission type for this log" });
    }


});

app.use((req, res, next) => {
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

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log(`Loggerithm operating on ${logger_version}`)
});