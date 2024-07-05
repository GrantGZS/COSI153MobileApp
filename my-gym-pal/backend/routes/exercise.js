const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Exercise routes
router.get('/:muscle', exerciseController.getExercises);

module.exports = router;
