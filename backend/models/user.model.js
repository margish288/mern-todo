import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 150,
  },
  email: {
    type: String,
    requqired: true,
    trim: true,
    unique: true,

    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,

    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least 8 characters, including letters and numbers",
    ],
  },
  resetToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
