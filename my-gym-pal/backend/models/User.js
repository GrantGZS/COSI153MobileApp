const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  type: String,
  equipment: String,
  difficulty: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: String,
  weight: String,
  mode: String,
  trainingPlan: [ExerciseSchema], // Add training plan field
});

module.exports = mongoose.model('User', UserSchema);
