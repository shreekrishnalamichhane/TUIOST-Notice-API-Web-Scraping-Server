import { Response } from "express";
import Utils from "../Helpers/Utils";

const ResponseService = {
    response: (response: Response, success: boolean = true, statusCode: number = 200, message: string = "", data: any = []) => {
        return response.status(statusCode).json({
            success: success,
            statusCode: statusCode,
            message: message,
            serverTime: new Date(),
            data: Utils.sortJson(data, "timestamp")
        });
    }
};

export default ResponseService;