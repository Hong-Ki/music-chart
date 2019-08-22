"use strict";

const mongoose = require("mongoose");
const Chart = require("./model/Chart");
const dataModule = require("./module/DataModule");
const Response = require("./module/Response");
const moment = require("moment-timezone");

const dbUrl = require("./config");

const connect = () => {
  return mongoose.connect(dbUrl);
};

module.exports.crawler = async event => {
  const response = new Response(200, { result: "OK", date: new Date() });
  const date = moment.tz("Asia/Seoul").format("YYYYMMDDHH");
  const chartData = { date: date };
  await dataModule()
    .then(data => {
      Object.assign(chartData, data);
      console.log(chartData);
    })
    .catch(error => {
      response.setStatus(500);
      response.setData(error);
    });
  await connect()
    .then(() => {
      if (chartData) {
        const chart = new Chart(chartData);
        chart.save();
      } else {
        console.error("NO_DATA", chartData);
      }
    })
    .catch(error => {
      console.log("conn ERROR", chartData);
      response.setStatus(500);
      response.setData(error);
    });

  return response.get();
};

module.exports.load = async event => {
  const response = new Response();
  await connect()
    .then(() =>
      Chart.find()
        .sort({ date: -1 })
        .limit(24)
        .lean()
        .exec()
    )
    .then(charts => {
      response.setData(charts);
      response.setHeaders({
        "Access-Control-Allow-Origin": "*"
      });
    })
    .catch(error => {
      response.setStatus(500);
      response.setData(error);

      console.error(error);
    });

  return await response.get();
};
