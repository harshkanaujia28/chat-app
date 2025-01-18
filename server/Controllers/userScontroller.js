// userController.js
const User = require("../models/User"); // Assuming you're using MongoDB and Mongoose, or use your user model

// Example of the searchUsers function
const searchUsers = async (req, res) => {
  const query = req.query.name?.toLowerCase() || '';  // Capture the 'name' query param

  try {
    // Find users where their name contains the query string (case-insensitive search)
    const users = await User.find({ name: { $regex: query, $options: "i" } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);  // Return the list of matched users
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Other controller functions (registerUser, loginUser, etc.)

module.exports = {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  searchUsers, // Exporting the searchUsers function
};
