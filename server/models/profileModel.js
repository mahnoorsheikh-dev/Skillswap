import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    role: { type: String, default: "" },
    location: { type: String, default: "" },
    about: { type: String, default: "" },
    avatar: { type: String, default: "" },
    skillsOffered: [{ type: String }],
    skillsWanted: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);