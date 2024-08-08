import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: "Please enter a valid email.",
      },
      unique: true,
    },

    password: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password || "", 10);
  next();
});

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN || "",
    {
      expiresIn: "5m",
    }
  );
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_TOKEN || "",
    {
      expiresIn: "3d",
    }
  );
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
