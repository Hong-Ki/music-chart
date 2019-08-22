"use strict";
const cheerio = require("cheerio");
const getHTML = require("../module/AxiosModule");
const SongInfo = require("../module/SongInfo");

const url = "https://music.naver.com/listen/top100.nhn?domain=TOTAL_V2";

const getChart = async (limit = 25) => {
  return getHTML(url)
    .then(html => {
      const $ = cheerio.load(html.data);
      const $list = $("tr._tracklist_move");

      return (
        $list
          .get()
          /** 숨겨진 tr 때문에 1번부터 limit+1 만큼 자름 */
          .slice(1, limit <= $list.length - 1 ? limit + 1 : $list.length - 1)
          .map(el => {
            const $el = $(el);
            return new SongInfo(
              $el
                .find("td.ranking")
                .children("span")
                .text(),
              $el
                .find("td.name")
                .children("a.title")
                .attr("title"),
              $el
                .find("td.artist")
                .children("a._artist")
                .attr("title")
            ).get();
          })
      );
    })
    .catch(error => {
      console.log(error);
      return;
    });
};

module.exports = getChart;
