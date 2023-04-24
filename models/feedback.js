import mongoose from "mongoose";
const Schema = mongoose.Schema;
const feedback = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
});
export default mongoose.model("feedback", feedback);
