const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profliePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-profile&psig=AOvVaw1cGyVDVdtb8qNRyvTGsLOo&ust=1716105922427000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjdzfbeloYDFQAAAAAdAAAAABAE",
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
