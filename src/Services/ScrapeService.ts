import { Page } from 'puppeteer';
import { TNoticeItem } from '../@types/types';
import Utils from '../Helpers/Utils';
import BrowerService from './BrowserService';

const ScraperService = {
    scrape: async (browser: any, url: string) => {
        const page: Page = await BrowerService.goto(browser, url);
        return page;
    },

    getLinks: async (page: any) => {
        let links: string[] = [];
        let length = await page.evaluate(() => document.querySelectorAll(".notices-warpper .recent-post-wrapper .detail a").length || 0);

        for (let index = 0; index < length; index++) {
            let link: string = await page.evaluate((index: number) => {
                return document.querySelectorAll(".notices-warpper .recent-post-wrapper .detail")[index].querySelector('a')?.href;
            }, index);

            links.push(link);
        }
        return links;
    },

    getLinkContent: async (page: Page) => {
        const item: TNoticeItem = await page.evaluate(() => {
            return {
                'title': document.querySelector('.inner-downloads table tbody tr > td:nth-child(2)')?.textContent?.substring(1),
                'link': document.querySelector('.inner-downloads table tbody tr ')?.querySelector('a')?.href,
                'date': document.querySelector('.detail-page-inner .date #nep_date')?.textContent?.trim(),
                'hash': '',
                author: ''
            };
        });
        page.close();

        // Check if the item is valid, if not return
        if (!item['link']) return;

        // Set the hash and author
        item['hash'] = Utils.hashCode(item['link']);
        item['author'] = process.env.TUIOST_URL || 'https://iost.tu.edu.np';

        // Return the item
        return item;
    },
};

export default ScraperService;