import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
