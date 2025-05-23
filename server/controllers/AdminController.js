const Admin = require("../models/AdminModel.js");

exports.adminLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email: email });
    console.log("admin:", admin);
    if (!admin) {
      return res.status(401).json({ message: "Invalid email " });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid  password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin: admin,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
