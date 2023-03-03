const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minLength: 4
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        unique: true
    },
    dob: {
        type: Date,
        required: [true, "Please enter your DOB"],
    }


}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;