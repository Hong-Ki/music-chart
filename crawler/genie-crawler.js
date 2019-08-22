"use strict";
const cheerio = require("cheerio");
const getHTML = require("../module/AxiosModule");
const SongInfo = require("../module/SongInfo");

const url = "https://www.genie.co.kr/chart/top200";

const getChart = async (limit = 25) => {
  return getHTML(url)
    .then(html => {
      const $ = cheerio.load(html.data);
      const $list = $("tr.list");

      return $list
        .get()
        .slice(0, limit <= $list.length ? limit : $list.length)
        .map(el => {
          const $el = $(el);
          return new SongInfo(
            $el
              .find("td.number")
              .text()
              .substr(0, 2),
            $el.find("a.title").text(),
            $el.find("a.artist").text(),
            ["title"]
          ).get();
        });
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

module.exports = getChart;
