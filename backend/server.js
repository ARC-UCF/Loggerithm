import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

const app = express();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        error: "Too many login attempts. Try again later."
    }
});

const accountRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 4,
    message: {
        error: "Too many requests submitted. Try again later."
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

async function getLocationFromIP(ip) {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();

    return {
        country: data.county,
        region: data.regionName,
        city: data.city
    };
}

const users = [
    {
        callsign: "K9SRH", 
        password: "test",
        failedAttempts: 0,
        lockUntil: null
    }
];

const accountRequests = [ ]

app.post("/account-request", accountRequestLimiter, async (req, res) => {
    const { email } = req.body;
    const ip = req.ip;

    const fail = () => {
        return res.status(401).json({
            error: "Request for that address already exists."
        });
    };

    const eB = accountRequests.find(e => e.email === email);

    if (eB) {
        console.log("That email already exists in the system.");
        return fail();
    }

    const data = await getLocationFromIP(ip);

    accountRequests.push({email: email, country: data.country, region: data.region, city: data.city});

    console.log(`${email} was pushed into current requests.`);

    res.json({success: true, email})
})

app.post("/login", loginLimiter, (req, res) => {
    const { callsign, password } = req.body;

    const user = users.find(u => u.callsign === callsign);

    const fail = () => {
        if (user) {
            user.failedAttempts += 1

            if (user.failedAttempts >= 5) {
                user.lockUntil = Date.now() + 15 * 60 * 1000;
            }
        }

        return res.status(401).json({
            error: "Invalid callsign or password"
        });
    };

    if (!user) {
        console.log("Invalid callsign/username");
        return fail();
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
        console.log("Too many attempts for this user, account has been locked.");
        return res.status(403).json({
            error: "Account locked. Try again later."
        });
    }

    if (user.password !== password) {
        console.log("User submitted invalid password");
        return fail();
    }

    user.failedAttempts = 0;
    user.lockUntil = null;

    res.json({success: true, callsign})
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});