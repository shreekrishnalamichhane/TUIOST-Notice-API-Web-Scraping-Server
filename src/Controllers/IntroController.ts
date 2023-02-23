import { Request, Response } from "express";

const IntroController = {
    intro: (req: Request, res: Response) => {
        res.status(200).json({
            "title": process.env.APP_TITLE || "TUIOST API",
            "description": process.env.APP_DESCRIPTION || "",
            "author": {
                "name": "Shree Krishna Lamichhane",
                "url": "https://shreekrishnalamichhane.com.np",
                "github": "https://github.com/shreekrishnalamichhane"
            },
            "routes": {
                "watchNotice": {
                    "url": process.env.APP_URL + "/notice/watch",
                    "description": "Get latest notices (Max 20)."
                },
                "watchResult": {
                    "url": process.env.APP_URL + "/result/watch",
                    "description": "Get latest results (Max 20)."
                },
                "watchSchedule": {
                    "url": process.env.APP_URL + "/schedule/watch",
                    "description": "Get latest schedules (Max 20)."
                },
                "getNotice": {
                    "url": process.env.APP_URL + "/notice/all",
                    "description": "Get all notices. Takes long time to load."
                },
                "getResult": {
                    "url": process.env.APP_URL + "/result/all",
                    "description": "Get all results. Takes long time to load."
                },
                "getSchedule": {
                    "url": process.env.APP_URL + "/schedule/all",
                    "description": "Get all schedules. Takes long time to load."
                }
            }
        });
    }
};

export default IntroController;