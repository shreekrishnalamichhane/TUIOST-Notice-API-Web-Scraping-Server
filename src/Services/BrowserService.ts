import puppeteer from 'puppeteer';

const BrowserService = {
    init: async () => {
        return await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disabled-setupid-sandbox"],
            ignoreDefaultArgs: ['--disable-extensions'],
        });
    },
    goto: async (browser: any, url: string) => {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        return page;
    }
};

export default BrowserService;