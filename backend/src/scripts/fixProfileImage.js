import mongoose from "mongoose";
import User from "../models/User.js";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URL);

const users = await User.find({ profileImage: "" });
for (const user of users) {
  user.profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;
  await user.save();
  console.log(`Updated avatar for ${user.username}`);
}

console.log("Done!");
process.exit();