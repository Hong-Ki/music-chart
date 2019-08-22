'use strict';
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const SongInfo = require('../module/SongInfo');
const browserOption = {
  slowMo: 500,
  headless: true,
};
const pageOption = {
  timeout: 20000,
};

const url = 'http://www.mnet.com/chart/TOP100/';

const getChart = async (limit = 25) => {
  const browser = await puppeteer.launch(browserOption);
  const page = await browser.newPage();
  await page.goto(url, pageOption);

  const html = await page.$eval('html', e => e.outerHTML);
  await browser.close();

  const $ = cheerio.load(html);
  const $list = $('div.MMLTable')
    .children('table')
    .children('tbody')
    .children('tr');

  return await $list
    .get()
    .slice(0, limit <= $list.length ? limit : $list.length)
    .map(el => {
      const $el = $(el);
      return new SongInfo(
        $el
          .find('span.MMLI_RankNum')
          .text()
          // 위 가 붙음... 숫자 빼고 replace
          .replace(/[^0-9]+/g, ''),
        $el.find('a.MMLI_Song').text(),
        $el.find('a.MMLIInfo_Artist').text(),
      ).get();
    });
};

module.exports = getChart;
