import { Request, Response } from "express";
import moment from "moment";

const IntroController = {
    // Get intro
    intro: async (req: Request, res: Response) => {
        res.status(200).json({
            "title": process.env.APP_TITLE || "TUIOST API",
            "description": process.env.APP_DESCRIPTION || "",
            "author": {
                "name": "Shree",
                "url": "https://site.shreekrishnalamichhane.com.np",
                "github": "https://github.shreekrishnalamichhane.com.np"
            },
            "routes": {
                "notice": {
                    "method": "GET",
                    "url": process.env.APP_URL + "/notice",
                    "description": "Get latest notices (Max 6).",
                },
            },
            "responseTime": moment().diff(res.locals.start, 'milliseconds') + "ms"
        });
    }
};

export default IntroController;