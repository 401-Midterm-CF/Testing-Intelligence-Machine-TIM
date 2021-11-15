const mongoose = require('mongoose')

const userStatsSchema = new mongoose.Schema({
  user: {type: String},
  easyAnswers: {type: String},
  mediumAnswers: {type: String},
  hardAnswers: {type: String},
  totalAnswers: {type: String},
})

const UserStats = mongoose.model('UserStats', userStatsSchema);
module.exports = UserStats;