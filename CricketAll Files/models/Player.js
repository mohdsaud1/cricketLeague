 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




// Player Schema
const playerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bowler: { type: Boolean, default: false },
  batsman: { type: Boolean, default: false },
  allRounder: { type: Boolean, default: false },
  wicketKeeper: { type: Boolean, default: false },
  phoneNumber: { type: String, required: true, unique: true },
  biddedFor: { type: String, required: false }, // 
  soldTo: { type: String, required: false }
});

// Models

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
