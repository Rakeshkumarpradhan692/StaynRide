const Admin = require("../models/AdminModel.js");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({ message: "Invalid email " });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin: admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
