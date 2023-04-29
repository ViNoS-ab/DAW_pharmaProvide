import mongoose from "mongoose";
const Schema = mongoose.Schema;
const feedback = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
});
export default mongoose.model("feedback", feedback);
