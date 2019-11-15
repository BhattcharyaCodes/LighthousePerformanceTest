'use strict';
const puppeteer = require('puppeteer');
const commonMethods = require('./methods');

let browser;
let page;
let lhr;

beforeAll(async() => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

});

afterAll(() => {
 browser.close();
});

describe('GoogleLighthouse audit tests', sync() => {
    beforeAll(async() => {
        const url = 'htpps://www.google.com';
        //kick off a lighthouse audit on the above url
        lhr = await commonMethods.lighthouseAudit(browser, lhr);
        await commonMethods.writeToFileHTML(lhr);
        await commonMethods.writeToFileCSV(lhr);
    });

    it('passes an accessibility audit through lighthouse', async () =>{
        const accessibilityScore = await commonMethods.getLighthouseResult(lhr, 'accessibility');
        expect(accessibilityScore).toBeGreaterThanOrEqual(90);
    });

    it('passes a performance audit through Lighthouse', async () =>{
        const performanceScore = await commonMethods.getLighthouseResult(lhr,'performance');
        expect(performanceScore).toBeGreaterThan(5);
    });

    it('should pass a best practice audit through Lighthouse', async() => {
        const bestPracticeScore = await commonMethods.getLighthouseResult(lhr,'bestPractices');
        expect(bestPracticeScore).toBeGreaterThanOrEqual(75);
    });

    it('should pass the progressive web app audit through Lighthouse', async() => {
        const progressiveWebAppScore = await commonMethods.getLighthouseResult(lhr, 'progressiveWebApp')
        expect(progressiveWebAppScore).toBeGreaterThanOrEqual(20);
    });

    it('should pass the SEO audit through Lighthouse', async() => {
        const SEOScore = await commonMethods.getLighthouseResult(lhr,'contrast');
        expect(SEOScore).toEqual('Pass');
    });

    //it


});