import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

import IntroRouter from "./Routes/Intro";
import NoticeRouter from "./Routes/Notice";
import BrowserService from "./Services/BrowserService";
import moment from "moment";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${moment().locale("np").format("YYYY-MM-DD hh:mm:ss A")}][${req.ip}] ${req.method} ${req.url}`);
    next();
}
(async () => {
    let browser = await BrowserService.init();
    app.use('/', [logger], IntroRouter);
    app.use('/notice', [(req: Request, res: Response, next: NextFunction) => { res.locals.browser = browser; next() }, logger], NoticeRouter);
})();

export default app;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});