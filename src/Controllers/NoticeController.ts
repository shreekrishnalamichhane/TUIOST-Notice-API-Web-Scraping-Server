import { Request, Response } from "express";
import ResponseService from "../Services/ResponseService";
import CacheService from "../Services/CacheService";

import dotenv from "dotenv";
dotenv.config();

const NoticeController = {
    watch: async (req: Request, res: Response) => {
        try {
            // Get the cache
            const cache = await CacheService.get(res.locals.browser, 'notices');

            // Return the cache
            return ResponseService.response(res, true, 200, "Success", cache);
        }
        catch (error: any) {
            return ResponseService.response(res, false, 400, error.message, null);
        }
    },
}

export default NoticeController;