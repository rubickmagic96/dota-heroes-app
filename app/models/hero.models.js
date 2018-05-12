const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
  name: String,
  nickname: String,
  type: String,
  base_health: Number,
  base_mana: Number,
  base_armor: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Hero', HeroSchema);
