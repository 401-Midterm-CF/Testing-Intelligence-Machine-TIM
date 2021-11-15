'use strict'

const axios = require('axios')

const getQuiz = async (request, response) => {
  console.log('getting in')
  let questionURL= 'https://opentdb.com/api.php?amount=1';
  const questionResponse = await axios.get(questionURL)
  response.status(200).send(questionResponse.data.results)
}

module.exports = getQuiz