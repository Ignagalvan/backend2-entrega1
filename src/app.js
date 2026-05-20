import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";

import sessionsRouter from "./routes/sessions.router.js";
import initializePassport from "./config/passport.config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);

app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

export default app;