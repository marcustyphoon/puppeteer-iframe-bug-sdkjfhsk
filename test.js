#!/usr/bin/env node

import { launch } from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const browser = await launch({ browser: 'firefox', headless: false });
const page = await browser.newPage();

await page.goto(`file://${join(__dirname, 'html', 'index.html')}`);

await page.waitForSelector('iframe');

await Promise.all(
  page.frames().map(async (frame) => {
    const button = await frame.$('button');
    button?.click();
  }),
);

console.log('done!');
await browser.close();
