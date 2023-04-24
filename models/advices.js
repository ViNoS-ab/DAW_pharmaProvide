import mongoose from "mongoose";
const Schema = mongoose.Schema;
const advices = new Schema(
  {
    content: { type: String, required: true },
    picture: { type: String },
    pharmacist: { type: Schema.Types.ObjectId, required: true, ref: "pharmacist" },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "pharmacist" }],
    downvotes: [{ type: Schema.Types.ObjectId, required: true, ref: "pharmacist" }],
  },
  { timestamp: true }
);
export default mongoose.model("advices", advices);
