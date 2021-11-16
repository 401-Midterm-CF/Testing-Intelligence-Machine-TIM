const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	userID: { type: Number, require: true, unique: true },
	serverID: { type: Number, require: true },
	moneys: { type: Number, default: 1000 },
	vault: { type: Number },
});

const model = mongoose.model('member', memberSchema);
module.exports = model;
