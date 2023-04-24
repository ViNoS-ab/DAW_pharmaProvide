import mongoose from "mongoose";
const Schema = mongoose.Schema;
const pharmacist = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: value => {
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
        },
        message: "Please enter a valid email address",
      },
    },
    password: { type: String, required: true },
    location: { type: Map },
    bio: { type: String },
    advices: [{ type: Schema.Types.ObjectId, ref: "advices" }],
    medicines: [{ type: Schema.Types.ObjectId, ref: "medicines" }],
  },
  { timestamp: true }
);

export default mongoose.model("pharmacist", pharmacist);
