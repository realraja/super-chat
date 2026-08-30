// models/User.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true, select: false },
    phone: { type: String},
    avatar: { type: String },
    background: { type: String },

    verified: {
      type: Boolean,
      default: false,
    },
    dummy_data: [],
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdDate: [],
    
    email_otp: Number,
    phone_otp: Number,
    email_otp_expiry: Date,
    phone_otp_expiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.models.userSchema ||  mongoose.model("User", userSchema);
