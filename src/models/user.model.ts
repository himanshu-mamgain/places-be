import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  ],
  createdAt: {
    type: String,
    required: false,
    default: () => new Date().toString(),
  },
});

export = mongoose.model("User", userSchema);
