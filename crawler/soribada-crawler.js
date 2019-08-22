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
const url = 'http://www.soribada.com/music/chart';

const getChart = async (limit = 25) => {
  const browser = await puppeteer.launch(browserOption);
  const page = await browser.newPage();
  await page.goto(url, pageOption);

  const html = await page.$eval('html', e => e.outerHTML);
  await browser.close();

  const $ = cheerio.load(html);
  const $list = $('div.list-area-cont');

  return await $list
    .get()
    .slice(0, limit <= $list.length ? limit : $list.length)
    .map(el => {
      const $el = $(el);
      return new SongInfo(
        $el.find('span.num').text(),
        $el.find('span.song-title').text(),
        $el
          .find('span.artist')
          .find('a')
          .attr('title'),
      ).get();
    });
};

module.exports = getChart;
