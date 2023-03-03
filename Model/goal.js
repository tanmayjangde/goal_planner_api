const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "Please enter the goal title"],

    },
    description: {
        type: String,
        required: [true, "Please enter the goal description"],
    },
    targetAmount: {
        type: Number,
    },
    savedAmount: {
        type: Number
    }, 
    isActive: {
        type: Boolean
    }
}, {
    timestamps: true,
    required: true
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;