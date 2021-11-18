'use strict'
const fetch = require('node-fetch');
require('dotenv').config();
const memberSchema = require('../lib/model/memberSchema.js')
const mongoose = require('mongoose');
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('TIM to MongoDB, Come-in MongoDB'));


describe('Testing !quiz function', ()=> {
  it('should return 10 random quizes about video games from Trivia API', async ()=> {
    const questionRandom = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15'
    );
    const random = await questionRandom.json();
    const data = await random
    console.log(data)
    expect(data.results.length).toEqual(10);
  })

  it('should return 10 random quizes about video games from Trivia API of easy difficulty', async ()=> {
    const questionRandom = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy'
    );
    const random = await questionRandom.json();
    const data = await random
    console.log(data)
    expect(data.results.length).toEqual(10);
    expect(data.results[0].difficulty).toEqual('easy')
    expect(data.results[4].difficulty).toEqual('easy')
    expect(data.results[9].difficulty).toEqual('easy')
  })

  it('should return 10 random quizes about video games from Trivia API of medium difficulty', async ()=> {
    const questionRandom = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium'
    );
    const random = await questionRandom.json();
    const data = await random
    console.log(data)
    expect(data.results.length).toEqual(10);
    expect(data.results[0].difficulty).toEqual('medium')
    expect(data.results[4].difficulty).toEqual('medium')
    expect(data.results[9].difficulty).toEqual('medium')
  })

  it('should return 10 random quizes about video games from Trivia API of hard difficulty', async ()=> {
    const questionRandom = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=hard'
    );
    const random = await questionRandom.json();
    const data = await random
    console.log(data)
    expect(data.results.length).toEqual(10);
    expect(data.results[0].difficulty).toEqual('hard')
    expect(data.results[4].difficulty).toEqual('hard')
    expect(data.results[9].difficulty).toEqual('hard')
  })
})

describe('Testing database', ()=> {
  it('should add a new user to the user database', async ()=> {
    //need to create user for the test only and drop user from database when the test is over
    let newMember = await memberSchema.create({
      userID: 1,
      userName: 'test',
      serverID: 1,
      vault: 0,
    });
    let memberData = await memberSchema.findOne({
			userID: 1,
		});
    expect(memberData.moneys).toEqual(1000);
  })

})