const mongoose = require('mongoose');

const TrainingPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

module.exports = mongoose.model('TrainingPlan', TrainingPlanSchema);
