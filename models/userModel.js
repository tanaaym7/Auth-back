const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hashing using bcrypt
userSchema.pre("save", async function (next) {
  const currentUser = this;

  if (!currentUser.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);

    const hash_password = await bcrypt.hash(currentUser.password, saltRound);
    currentUser.password = hash_password;
  } catch (error) {
    next(error);
  }
});

// compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//  jwt sign

const User = mongoose.model("User", userSchema);

module.exports = User;
