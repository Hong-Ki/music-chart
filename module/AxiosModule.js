'use strict';
const axios = require('axios');

const getHTML = async url => {
  return await axios.get(url);
};

module.exports = getHTML;
