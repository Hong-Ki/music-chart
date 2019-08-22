'use strict';
const cheerio = require('cheerio');
const getHTML = require('../module/axiosModule');
const SongInfo = require('../module/SongInfo');

const url =
  'https://music.bugs.co.kr/chart/track/realtime/total?wl_ref=M_contents_03_01';

const getChart = async (limit = 25) => {
  return getHTML(url)
    .then(html => {
      const $ = cheerio.load(html.data);
      const $list = $('table.byChart')
        .children('tbody')
        .children('tr');

      return (
        $list
          .get()
          /** 숨겨진 tr 때문에 1번부터 limit+1 만큼 자름 */
          .slice(0, limit <= $list.length ? limit : $list.length)
          .map(el => {
            const $el = $(el);
            return new SongInfo(
              $el.find('strong').text(),
              $el
                .find('p.title')
                .children('a')
                .attr('title'),
              $el
                .find('p.artist')
                .children('a')
                .attr('title'),
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
