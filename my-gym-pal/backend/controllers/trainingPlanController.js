const TrainingPlan = require('../models/TrainingPlan');
const Exercise = require('../models/Exercise');

exports.addExercises = async (req, res) => {
  const { userId, exercises } = req.body;

  try {
    const trainingPlan = await TrainingPlan.findOne({ userId });

    if (!trainingPlan) {
      return res.status(404).json({ message: 'Training plan not found' });
    }

    const exerciseIds = exercises.map((exercise) => exercise._id);
    trainingPlan.exercises.push(...exerciseIds);

    await trainingPlan.save();
    res.status(200).json({ message: 'Exercises added to training plan' });
  } catch (error) {
    console.error('Error adding exercises to training plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
