import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;
const pharmacist = new Schema(
  {
    pharmacie_name: { type: String },
    location: { type: String },
    bio: { type: String },
    advices: [{ type: Schema.Types.ObjectId, ref: "advices" }],
    medicines: [{ type: Schema.Types.ObjectId, ref: "medicines" }],
  },
  { timestamp: true }
);

const user = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, unique: true, trim: true },
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
    pharmacist: pharmacist,

    following: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user.pharmacist",
      },
    ],
  },
  { timestamp: true }
);

user.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
export default mongoose.model("user", user);
