import { Schema, model } from "mongoose";

const usersCollection = "users";

const usersSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: "user" },
});

export const UserModel = model(usersCollection, usersSchema);
