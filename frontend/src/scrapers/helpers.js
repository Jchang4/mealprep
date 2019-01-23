"use strict";

import puppeteer from "puppeteer";
import cheerio from "cheerio";

/**
 * Get the HTML page from any URL
 * @param url string
 * @return Cheerio HTML page
 */
export async function getHtml(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    timeout: 30000,
    waitUntil: "networkidle2"
  });
  const html = await page.content();

  await browser.close();

  return cheerio.load(html);
}

/**
 * Remove multiple new line characters, such as
 * "\n            "
 */
export function removeWhiteSpace(s) {
  return s.replace(/\s{2,}/, "");
}

export function asQueryList(items) {
  return items.join("%20");
}

export function asArray(item) {
  if (!Array.isArray(item)) {
    return [item];
  }
  return item;
}
