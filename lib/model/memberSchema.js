const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	userID: { type: Number, require: true, unique: true },
	username: { type: String, require: true },
	serverID: { type: Number, require: true },
	moneys: { type: Number, default: 1000 },
	vault: { type: Number },
});

const memberModel = mongoose.model('member', memberSchema);
module.exports = memberModel;
