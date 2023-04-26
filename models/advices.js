import mongoose from "mongoose";
const Schema = mongoose.Schema;
const advices = new Schema(
  {
    content: { type: String, required: true },
    picture: { type: String },
    pharmacist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user.pharmacist",
    },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "user.pharmacist" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "user.pharmacist" }],
  },
  { timestamp: true }
);
export default mongoose.model("advice", advices);
