const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }

  // Return null if error
  return null;
};

const comparePassword = async (pw, hash) => {
  try {
    return await bcrypt.compare(pw, hash);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword, comparePassword };
