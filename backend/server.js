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

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
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

app.get("/server/check-call", requireAuth, (req, res) => {
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

app.post("/server/login", (req, res) => {

    const { call } = req.body;

    if (!call) {
        res.status(400).json({ error: "Username required" });
        return;
    }

    for (const user of activeUsers.values()) {
        if (user.username === username) {
            return res.status(409).json({ error: "Callsign already in use" });
        }
    }

    req.session.user = {
        call,
    };

    activeUsers.set(req.sessionID, {
        usernamne: call,
        lastSeen: Date.now(),
    });

    res.status(200).json({ message: "Logged in successfully" });
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

setInterval(() => {
    if (!sessionStore) return;

    for (const [sessionId, user] of activeUsers.entries()) {
        sessionStore.get(sessionId, (err, session) => {
            if (err || !session) {
                activeUsers.delete(sessionId);
            }
        });
    }
}, 1000 * 60);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log(`Loggerithm operating on ${logger_version}`)
});