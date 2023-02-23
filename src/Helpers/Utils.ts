import BrowerService from "../Services/BrowserService";

const Utils = {
    hashCode: (val: string) => {
        return require("crypto").createHash("sha256").update(val).digest("hex");
    },
    getTimestamp: (dateStr: string) => {
        // dataStr = "16th Feb, 2022"
        let find = ["st", "nd", "rd", "th"];
        for (var i = 0; i < find.length; i++) {
            dateStr = dateStr.replace(find[i], "");
        }
        return new Date(dateStr).getTime();
    },
    sortJson: (json: any, key: string) => {
        return json.sort(function (obj1: any, obj2: any) {
            return obj1[key] + obj2[key];
        });
    },
    getTotalPages: async (browser: any, url: string) => {
        const page = await BrowerService.goto(browser, url);
        let length = await page.evaluate(() => {
            let all = document.querySelectorAll("ul.pagination .page-item");
            return all[all.length - 2].querySelector("a")?.textContent || 0;
        });
        page.close();
        return length;
    },
}

export default Utils;