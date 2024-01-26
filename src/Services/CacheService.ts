import fs from 'fs';
import moment from 'moment';
import { TCacheData, TNoticeItem } from '../@types/types';
import { Browser } from 'puppeteer';

import ScraperService from "../Services/ScrapeService";
import Log from '../Helpers/Log';
import Discord from '../Helpers/Discord';
let SCRAPER_RUNNING = false;
const TUIOST_URL = process.env.TUIOST_URL || 'https://iost.tu.edu.np';
const CACHE_EXPIRY_IN_MINUTES = parseFloat(process.env.CACHE_EXPIRY_DURATION || "1");
const SCRAPER_TIMEOUT_DURATION = parseFloat(process.env.SCRAPER_TIMEOUT_DURATION || "30");

const CacheService = {
    // Get a value from the cache
    get: async (browser: Browser, key: string) => {
        // Check if the cache file exists, if not return null
        const exists: boolean = fs.existsSync(`./cache/${key}.json`);
        if (!exists) { CacheService.cache(browser, key); return null };

        // Read the cache file and parse the JSON
        const json: string = fs.readFileSync(`./cache/${key}.json`, 'utf8');
        const cache: TCacheData = JSON.parse(json);

        // Check if the cache has expired or doesnot exists, return null
        if (!exists || moment().isAfter(moment(cache.expiredAt))) { CacheService.cache(browser, key) };

        // Else return the cache data
        return cache.data;
    },

    // Set a value in the cache
    set: (key: string, value: TCacheData) => {
        try {
            // Create the cache directory if it doesnot exists
            const exists: boolean = fs.existsSync(`./cache`);
            if (!exists) fs.mkdirSync(`./cache`);

            // Create the cache file and write the cache data
            fs.writeFileSync(`./cache/${key}.json`, JSON.stringify(value));

            // Return true
            return true;
        } catch (error) {
            // Log the error and return false
            Log.syslog(error);
            return false;
        }
    },

    cache: async (browser: Browser, key: string) => {
        // Check if the scraper is already running
        if (SCRAPER_RUNNING) {
            Log.syslog('CACHE : Caching is already running...');
            return;
        }

        // Else, start scraping
        Log.syslog('CACHE : Caching process started...');

        // Set the scraper running
        SCRAPER_RUNNING = true;

        // Set the scrapper running timeout to 15 seconds
        setTimeout(() => {
            if (SCRAPER_RUNNING) {
                SCRAPER_RUNNING = false;
                Log.syslog('CACHE : Caching process timed out...');
                Discord.message("Scraper Server Timed Out..");
            }
        }, SCRAPER_TIMEOUT_DURATION * 1000);  // SCRAPER_TIMEOUT_DURATION in seconds

        // Scrape the page
        let page = await ScraperService.scrape(browser, TUIOST_URL + '/' + key);

        // Get the links from the page
        let links: string[] = await ScraperService.getLinks(page);

        // Initialize the data
        let data: TNoticeItem[] = [];

        // Loop through the links and get the content
        for (let index = 0; index < links.length; index++) {
            const page = await ScraperService.scrape(browser, links[index]);
            const content = await ScraperService.getLinkContent(page);
            if (content) data.push(content);
        }

        // Prepare the cache data
        const cache: TCacheData = {
            expiredAt: parseInt(moment().add(CACHE_EXPIRY_IN_MINUTES, 'm').unix().toString() + "000"),
            data
        }

        // Set the cache
        CacheService.set(key, cache);
        SCRAPER_RUNNING = false;

        Log.syslog('CACHE : Caching process completed...');
    }
}

export default CacheService;