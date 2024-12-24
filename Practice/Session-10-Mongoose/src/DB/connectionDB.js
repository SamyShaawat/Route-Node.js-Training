import mongoose from "mongoose";


export const connectionDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/session10')
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);

    })
}