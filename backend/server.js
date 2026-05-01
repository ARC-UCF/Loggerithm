import express from "express";
import cors from "cors";
import session from "express-session";
require("dotenv").config();

const logger_version = "v1.0.0"
const app = express();

const csv_link = "https://pota.app/all_parks_ext.csv"; {/* The link we shall use to download the CSV for reference. */}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.TOKEN,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 48 // 2 days
        },
    })
);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log(`Loggerithm operating on ${logger_version}`)
});