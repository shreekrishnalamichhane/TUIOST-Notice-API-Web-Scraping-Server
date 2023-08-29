import Utils from '../Helpers/Utils';
import BrowerService from './BrowserService';
import moment from 'moment';

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
    getLinks: async (page: any) => {
        let links: any = [];
        let length = await page.evaluate(() => document.querySelectorAll(".notices-warpper .recent-post-wrapper .detail a").length || 0);

        for (let index = 0; index < length; index++) {
            let link = await page.evaluate((index: number) => {
                return document.querySelectorAll(".notices-warpper .recent-post-wrapper .detail")[index].querySelector('a')?.href;
            }, index);

            links.push(link);
        }
        return links;
    },

    getLinkContent: async (page: any) => {
        const item = await page.evaluate(() => {
            return {
                'title': document.querySelector('.inner-downloads table tbody tr > td:nth-child(2)')?.textContent?.substring(1),
                'link': document.querySelector('.inner-downloads table tbody tr ')?.querySelector('a')?.href,
                'date': document.querySelector('.detail-page-inner .date #nep_date')?.textContent?.trim(),
            };
        });
        page.close();

        item['hash'] = Utils.hashCode(item['title'] + item['link']);
        item['author'] = process.env.TUIOST_URL || 'https://iost.tu.edu.np';

        return item;
    },
};

export default ScraperService;