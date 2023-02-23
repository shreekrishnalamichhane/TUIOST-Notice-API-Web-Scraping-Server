import { Request, Response } from "express";
import Utils from "../Helpers/Utils";
import ResponseService from "../Services/ResponseService";
import ScraperService from "../Services/ScrapeService";

const TUIOST_URL = process.env.TUIOST_URL || 'https://tuiost.edu.np';

const NoticeController = {
    watch: async (req: Request, res: Response) => {
        try {
            let page = await ScraperService.scrape(req.browser, TUIOST_URL + '/notice');
            if (page) {
                let data = await ScraperService.sanitize(page);
                return ResponseService.response(res, true, 200, "Success", Utils.sortJson(data, "timestamp"));
            }
            return ResponseService.response(res, true, 200, "Success", null);
        }
        catch (error: any) {
            return ResponseService.response(res, false, 400, error.message, null);
        }
    },
    all: async (req: Request, res: Response) => {
        try {
            let pages = await Utils.getTotalPages(req.browser, TUIOST_URL + '/notice');
            let datas: any = [];

            for (let index = 0; index < pages; index++) {
                let page = await ScraperService.scrape(req.browser, TUIOST_URL + '/notice?page=' + index);
                if (page) {
                    let data = await ScraperService.sanitize(page);
                    datas = [...datas, ...data]
                }
            }
            return ResponseService.response(res, true, 200, "Success", Utils.sortJson(datas, "timestamp"));
        }
        catch (error: any) {
            return ResponseService.response(res, false, 400, error.message, null);
        }
    }
}

export default NoticeController;