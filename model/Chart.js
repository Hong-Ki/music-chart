const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  rank: Number,
  title: String,
  artist: String
});

const ChartSchema = new mongoose.Schema({
  date: String,
  BUGS: [SongSchema],
  GENIE: [SongSchema],
  MELON: [SongSchema],
  // MNET: [SongSchema],
  NAVER: [SongSchema]
  // SORIBADA: [SongSchema],
});

const Chart = mongoose.model("Chart", ChartSchema);

module.exports = Chart;
