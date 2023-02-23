import express from "express";
import dotenv from "dotenv";

import IntroRouter from "./Routes/Intro";
import ScheduleRouter from "./Routes/Schedule";
import ResultRouter from "./Routes/Result";
import NoticeRouter from "./Routes/Notice";
import BrowserService from "./Services/BrowserService";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
(async () => {
    let browser = await BrowserService.init();

    app.use('/', IntroRouter);
    app.use('/notice', (req, res, next) => { req.browser = browser; next() }, NoticeRouter);
    app.use('/result', (req, res, next) => { req.browser = browser; next() }, ResultRouter);
    app.use('/schedule', (req, res, next) => { req.browser = browser; next() }, ScheduleRouter);
})();



export default app;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});