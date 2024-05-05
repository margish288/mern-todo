import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

import { createToken } from "../utils/generateToken.js";
import Validator from "../utils/validator.js";

const validator = new Validator(); // use for validation

export const registerUser = async (request, response) => {
  let { username = "", email = "", password = "" } = request.body;
  try {
    // remove unwanted extra spaces
    username = username.trim();
    email = email.trim();
    password = password.trim();

    // Validation of fields
    const isUserNameEmpty = validator.isEmpty(username, "Username");
    const isEmailEmpty = validator.isEmpty(email, "Email");
    const isPasswordEmpty = validator.isEmpty(password, "Password");

    if (isUserNameEmpty || isEmailEmpty || isPasswordEmpty) {
      return response
        .status(400)
        .json({ message: isUserNameEmpty || isEmailEmpty || isPasswordEmpty });
    }

    // password should not be equal to username
    if (validator.isEqual(username, password)) {
      return response
        .status(400)
        .json({ message: "Password should not be equal to Username." });
    }

    // password should not be equal to email
    if (validator.isEqual(email, password)) {
      return response
        .status(400)
        .json({ message: "Password should not be equal to Email." });
    }

    const isValidEmail = validator.validateEmail(email);
    if (!isValidEmail) {
      return response.status(400).json({ message: "Invalid email" });
    }

    const isValidUsername = validator.validateName(username);
    if (!isValidUsername) {
      return response.status(400).json({
        message: "Username must contain atleast 3 characters (only letters)",
      });
    }

    const isValidPassword = validator.validatePassword(password);
    if (!isValidPassword) {
      return response.status(400).json({
        message:
          "Password must contain at least 8 characters, including letters and numbers",
      });
    }

    // Checking Existing User
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return response.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = await createToken(user._id);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // console.log("User registered successfully", user);

    const responseUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    response.status(201).json({
      user: responseUser,
      message: "User registered successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error while registering user: ", error);
    response.status(500).json({ message: error.message });
  }
};

export const loginUser = async (request, response) => {
  let { email = "", password = "" } = request.body;
  try {
    // remove unwanted extra spaces
    email = email.trim();
    password = password.trim();

    // Validation of fields
    const isEmailEmpty = validator.isEmpty(email, "Email");
    const isPasswordEmpty = validator.isEmpty(password, "Password");
    if (isEmailEmpty || isPasswordEmpty) {
      return response
        .status(400)
        .json({ message: isEmailEmpty || isPasswordEmpty });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ message: "No user found with provided email." });
    }

    // checking password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(400).json({
        message: "Oops ! Please check you password it seems incorrect...",
      });
    }

    const token = createToken(user._id);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    response.status(200).json({
      user: responseUser,
      message: "User logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error while logging in: ", error);
    response.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (request, response) => {
  try {
    const id = request.user.id;
    const user = await userModel.findById(id).select("-password");
    response.status(200).json({
      user,
      message: "User profile fetched successfully.",
      success: true,
      token: request.token,
    });
  } catch (error) {
    console.log("Error while fetching user profile: ", error);
    response.status(500).json({ message: error.message });
  }
};
