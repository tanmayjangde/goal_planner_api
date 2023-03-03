const express = require('express');
const router = express.Router();
const { protectUser } = require('../middlewares/authMiddleware');
const { updateGoal, createGoal, getAllGoals, getAllActiveGoals} = require('../Controller/goalController');

router.get('/allGoals', protectUser, getAllGoals);
router.get('/activeGoals', protectUser, getAllActiveGoals);
router.post('/createGoal', protectUser, createGoal);
router.post('/updateGoal', protectUser, updateGoal);

module.exports = router;