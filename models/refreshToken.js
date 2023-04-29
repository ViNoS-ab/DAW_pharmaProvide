import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

export default mongoose.model("token", userTokenSchema);
