"use strict";
const cheerio = require("cheerio");
const getHTML = require("../module/AxiosModule");
const SongInfo = require("../module/SongInfo");

const url = "https://www.melon.com/chart/index.htm";

const getChart = async (limit = 25) => {
  return getHTML(url)
    .then(html => {
      const $ = cheerio.load(html.data);
      const $list = $("tr.lst50");

      return $list
        .get()
        .slice(0, limit <= $list.length ? limit : $list.length)
        .map(el => {
          const songInfo = $(el)
            .find("div.wrap_song_info")
            .find("span a");
          return new SongInfo(
            $(el)
              .find("span.rank")
              .text(),
            $(songInfo[0]).text(),
            $(songInfo[1]).text()
          ).get();
        });
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

module.exports = getChart;
