const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  instructions: { type: String },
  type: { type: String },
  equipment: { type: String },
  difficulty: { type: String },
});

const TrainingPlanSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: [ExerciseSchema],
});

module.exports = mongoose.model('TrainingPlan', TrainingPlanSchema);
