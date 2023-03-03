const jwt = require("jsonwebtoken");
//const bcrypt = require('bcryptjs');
const User = require("../Model/user");
const asyncHandler = require("express-async-handler");
const client = require("twilio")(
  "AC50abcd2f4dd824918678383b472d616a",
  "0c42aa034c91e05c04063546901289d1"
);

// Sending OTP
const generateOtp = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;
  //otp generation
  var otp = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const result = otp();

  client.messages
    .create({
      body: `rubex verification OTP ${result}`,
      to: phoneNumber, // Text this number
      from: "+17579191917", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .then((message) => console.log(result))
    .catch((err) => console.log(err));

  return res.status(200).json({ otp: result });
  //return res.send(`${otp}`);
});

// // OTP verification
// const verifyOtp = asyncHandler(async (req, res) => {
//   const { otp, userOtp } = req.body;
//   if (otp == userOtp) {
//     res.status(200).json({
//       token: generateToken(newUser.id),
//     });
//   }
// });

const registerUser = asyncHandler(async (req, res) => {
  // Check for null values
  const { username, phoneNumber, dob } = req.body;
  if (!username || !phoneNumber || !dob) {
    res.status(400).json({ message: "Please enter all fields" });
    throw new Error("Please enter all fields");
  }

  //Check if user exist
  const userExist = await User.findOne({ phoneNumber });
  if (userExist) {
    res.status(400).json({ message: "Phone number already exist" });
    throw new Error("Phone number already exist");
  } else {
    //Create User
    const newUser = await User.create({
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
      dob: req.body.dob,
    });

    if (!newUser) {
      res.status(400).json({ message: "Invalid User data" });
      throw new Error("Invalid User data");
    } else {
      res.status(200).json({
        _id: newUser._id,
        phoneNumber: newUser.phoneNumber,
        token: generateToken(newUser._id),
      });
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const user = await User.findOne({ _id });

  if (user) {
    //otp send to user

    //send response with jwt token
    res.status(200).json({
      _id: newUser.id,
      phoneNumber: newUser.phoneNumber,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400).json({ message: "User Not Found" });
    throw new Error("User Not Found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  res.status(200).json(user);
});
/*
const deleteBoard = asyncHandler(async(req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);

    if (!project) {
        res.status(400);
        throw new Error("This project doesn't exist");
    }


});
*/

const generateToken = (id) => {
  return jwt.sign({ id }, "nPTn2+woohoow6WOIi43RRZgMIMio2VGH/EJpSV", {
    expiresIn: "30d",
  });
};
module.exports = { registerUser, generateOtp, getUser };
