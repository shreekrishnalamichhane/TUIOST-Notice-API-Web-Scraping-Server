import Utils from '../Helpers/Utils';
import BrowerService from './BrowserService';

const ScraperService = {
    scrape: async (browser: any, url: string) => {
        try {
            const page = await BrowerService.goto(browser, url);
            return page;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    sanitize: async (page: any) => {
        let data: any = [];
        let length = await page.evaluate(() => document.getElementById('notices')?.getElementsByClassName("mt-3").length || 0);

        data = await page.evaluate(() => {
            const divs = document.getElementById('notices')?.getElementsByClassName("mt-3") || [];
            let values = [];
            for (let index = 0; index < divs.length; index++) {
                values.push({
                    'title': divs[index].querySelector('b')?.textContent,
                    'link': divs[index].querySelector('a')?.href,
                    'date': divs[index].querySelector('small')?.textContent,
                });
            }
            return values;
        });

        data.forEach((ele: Element, index: number) => {
            data[index]['hash'] = Utils.hashCode(data[index]['title'] + data[index]['link'] + data[index]['date']);
            data[index]['author'] = process.env.TUIOST_URL || 'https://tuiost.edu.np';
            data[index]['timestamp'] = new Date(Utils.getTimestamp(data[index]['date']));
            data[index]['unixTimestamp'] = Utils.getTimestamp(data[index]['date']);
        });

        page.close();
        return data;
    },
};

export default ScraperService;