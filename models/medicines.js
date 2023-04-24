import mongoose from "mongoose";
const Schema = mongoose.Schema;
const medicines = new Schema(
  {
    pharmacist: { type: Schema.Types.ObjectId, required: true, ref: "pharmacist" },
    name: { type: String, required: true, unique: true },
    picture: { type: String, required: true },
    comment: { type: String },
  },
  { timestamp: true }
);
export default mongoose.model("medicines", medicines);
