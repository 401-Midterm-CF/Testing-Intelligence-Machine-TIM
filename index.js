'use strict'
require('dotenv').config();
const { start }= require('./lib/server' )
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const PORT = process.env.PORT || 3000


start(PORT)