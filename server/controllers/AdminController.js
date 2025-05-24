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

exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, email, gender, password } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (name) admin.name = name;
    if (email) admin.email = email;
    if (gender) admin.gender = gender;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }
    await admin.save();

    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
