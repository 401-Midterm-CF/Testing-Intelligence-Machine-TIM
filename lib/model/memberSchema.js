const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	serverID: { type: String, require: true },
	moneys: { type: Number, default: 1000 },
	vault: { type: Number },
});

const model = mongoose.model('memberScheme', memberSchema);
module.exports = model;
