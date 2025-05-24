const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log(req.body.formData);
  try {
    const {
      image,
      name,
      email,
      number,
      password,
      country,
      state,
      district,
      city,
      address,
    } = req.body.formData;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      image,
      name,
      email,
      number,
      password: hashedPassword,
      country,
      state,
      district,
      city,
      address,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ error: "Server Error: " + err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ sucess: true, users: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const users = await Users.find({ _id: id });
    res.status(200).json({ sucess: true, users: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id, password, ...rest } = req.body;

    const updateData = { ...rest };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await Users.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const deleted = await Users.findByIdAndDelete({ _id: id });
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
