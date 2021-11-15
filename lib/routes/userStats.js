'use strict'

const UserStats = require('../model/user.js')

const getallUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
}

// class Users {
//   constructor(user, easyAnswers, mediumAnswers, hardAnswers, totalAnswers) {
//     this.user = user;
//     this.easyAnswers = easyAnswers;
//     this.mediumAnswers = mediumAnswers;
//     this.hardAnswers = hardAnswers;
//     this.totalAnswers = totalAnswers;
//   }
// }

const createUser = async (req, res) => {
  const userInfo = req;
  console.log(userInfo)
    try{
      const newUser = await UserStats.create({
        user: userInfo.user,
        easyAnswers: userInfo.easyAnswers,
        mediumAnswers: userInfo.mediumAnswers,
        hardAnswers: userInfo.hardAnswers,
        totalAnswers: userInfo.totalAnswers,
      });
      res.status(201).send(newUser)
    }
    catch(error){
      res.status(404).send('cant add user')
    }
}

module.exports = {
  createUser,
  getallUsers,
}