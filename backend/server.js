import express from "express";
import cors from "cors";

const logger_version = "v1.0.0"
const app = express();

const csv_link = "https://pota.app/all_parks_ext.csv"; {/* The link we shall use to download the CSV for reference. */}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

const users = [
    {
        callsign: "K9SRH", 
    }
];



app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log(`Loggerithm operating on ${logger_version}`)
});