"use strict";

const getBugsData = require("../crawler/bugs-crawler");
const getGenieData = require("../crawler/genie-crawler");
const getMelonData = require("../crawler/melon-crawler");
// const getMnetData = require('../crawler/mnet-crawler');
const getNaverData = require("../crawler/naver-crawler");
// const getSoribadaData = require('../crawler/soribada-crawler');
const get = async () => {
  let data = {
    BUGS: [],
    GENIE: [],
    MELON: [],
    // MNET: [],
    NAVER: []
    // SORIBADA: [],
  };
  await getBugsData().then(result => {
    return (data.BUGS = result);
  });
  await getGenieData().then(result => {
    return (data.GENIE = result);
  });
  await getMelonData().then(result => {
    return (data.MELON = result);
  });
  // await getMnetData().then(result => {
  //   return (data.MNET = result );
  // });
  await getNaverData().then(result => {
    return (data.NAVER = result);
  });
  // await getSoribadaData().then(result => {
  //   return (data.SORIBADA = result );
  // });

  return await data;
};

module.exports = get;
