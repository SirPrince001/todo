require("dotenv").config();
const Mongoose = require("mongoose");
const User = require("../models/users");
const Bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");

exports.createUser = async (request, response) => {
  // check for existing user with email

  let existingUser = await User.findOne({ email: request.body.email });
  if (existingUser) {
    return response.status(422).json({
      success: false,
      responseMessage: ` User with this email ${existingUser.email} already exist`,
    });
  } else {
    let { fullname, email, password } = request.body;
    password = Bcrypt.hashSync(request.body.password, 10);

    let newUser = new User({
      fullname,
      email,
      password,
    });
    let userData = await newUser.save();
    userData = userData.toJSON();
    delete userData.password;
    const userPayload = {
      fullname: userData.fullname,
      email: userData.email,
    };

    let userToken = Jwt.sign(userPayload, process.env.SECRETY);
    return response.status(200).json({
      savedUser: userPayload,
      userToken: userToken,
    });
  }
};

exports.loginUser = async (request, response) => {
  let userEmail = await User.findOne({ email: request.body.email });
  if (!userEmail)
    return response.status(400).json({
      success: false,
      responseMessage: `No user with such email ${userEmail}`,
    });

  if (
    userEmail &&
    Bcrypt.compareSync(request.body.password, userEmail.password)
  ) {
    return response
      .status(200)
      .json({ success: true, responseMessage: userEmail });
  } else {
    return response
      .status(400)
      .json({ success: false, responseMessage: "Wrong Password" });
  }
};

exports.getSingleUser = async (request, response) => {
  try {
    let userId = request.params.userId;
    if (!Mongoose.isValidObjectId(userId))
      return response.status(404).json({
        success: false,
        responseMessage: `No user matches with the user id ${userId}`,
      });
    let user = await User.findById(userId);
    return response.status(200).json({ success: true, responseMessage: user });
  } catch (error) {
    return response.status(404).json({
      success: false,
      responseMessage: `Cannot find user with this id ${userId}`,
    });
  }
};

exports.getAllUser = async (request, response) => {
  try {
    let allUser = await User.find({}).populate("task", "taskName");
    return response
      .status(200)
      .json({ success: true, responseMessage: allUser });
  } catch (error) {
    return response.status(404).json({
      success: false,
      responseMessage: " Unable to find all the users",
    });
  }
};

