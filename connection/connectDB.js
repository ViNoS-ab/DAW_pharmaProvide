import mongoose from "mongoose";

const connectDB = async cb => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("connected to DB");
    return cb();
  } catch (err) {
    console.log(err);
    return cb(err);
  }
};

export default connectDB;
