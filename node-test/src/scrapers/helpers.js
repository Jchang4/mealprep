"use strict";

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

/**
 * Get the HTML page from any URL
 * @param url string
 * @return Cheerio HTML page
 */
exports.getHtml = async function getHtml(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    timeout: 60000,
    waitUntil: "networkidle2"
  });
  const html = await page.content();

  await browser.close();

  return cheerio.load(html);
};

/**
 * Remove multiple new line characters, such as
 * "\n            "
 */
exports.removeWhiteSpace = function removeWhiteSpace(s) {
  return s.replace(/\s{2,}/, "");
};

exports.asQueryList = function asQueryList(items) {
  return items.join("%20");
};
