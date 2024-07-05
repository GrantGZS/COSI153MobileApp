const express = require('express');
const router = express.Router();
const trainingPlanController = require('../controllers/trainingPlanController');

router.post('/add', trainingPlanController.addExercises);

module.exports = router;
