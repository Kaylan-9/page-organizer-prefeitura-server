import puppeteer from 'puppeteer';

export const screenshot = async (dirImage: string, url: string) => {
  const browser = await puppeteer.launch({args: ['--start-maximized']});
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({path: dirImage});
  browser.close();
};