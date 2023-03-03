const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const Goal = require('../Model/goal');
const User = require('../Model/user');
const asyncHandler = require('express-async-handler');

const getAllGoals = asyncHandler(async(req, res) => {
    const user = req.user._id;
    const goals = await Goal.find({user});

    if(!goals){
        return res.status(400).json({
            message: "Goal doesn't exist"
        })
    }

    return res.status(400).json({
        goals
    })
});

const getAllActiveGoals = asyncHandler(async(req, res) => {
    const user = req.user._id;
    const goals = await Goal.find({user: user, isActive: true});

    if(!goals){
        return res.status(400).json({
            message: "Goal doesn't exist"
        })
    }

    return res.status(400).json({
        goals
    })
})

const createGoal = asyncHandler(async(req, res) => {
    const { title, description, targetAmount,durationInMonths } = req.body;
    const user = req.user;

    if (user) {
        const goal = await Goal.create({
            title: title,
            description: description,
            targetAmount: targetAmount,
            durationInMonths: durationInMonths,
            isActive: true,
            user: user._id,
            savedAmount: 0
        })
        res.status(200).json({
            message: 'Goal created',
            goal: goal
        });
    } else {
        res.status(400).json({ message: "User Not Found" });
        throw new Error("User Not Found");
    }
});

const updateGoal = asyncHandler(async(req, res) => {
    const { goalId, addedAmount } = req.body;
    const user = req.user;

    const goal = await Goal.findById(goalId);

    if(!goal){
        return res.status(400).json({
            message: "Goal doesn't exist"
        })
    }

    if(user._id.toString == goal.user.toString){
        const savedAmount = Number(goal.savedAmount);
        goal.savedAmount = savedAmount + Number(addedAmount);
        if(goal.savedAmount>=goal.targetAmount)
        goal.isActive=false;

        await goal.save();
        return res.status(200).json({
            success: true,
            message: 'Goal updated'
        });
    }else{
        return res.status(400).json({
            success: false,
            message: 'Updating goal failed'
        });
    }
});

module.exports = { createGoal, updateGoal, getAllGoals, getAllActiveGoals};