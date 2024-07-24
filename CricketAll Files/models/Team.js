const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team Schema
const teamSchema = new Schema({
    mngName: { type: String, required: true },
    team: { type: String, required: true },
    budget: { type: Number, required: true },
    mobileNo: { type: Number, required: true },
});

// Models

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;