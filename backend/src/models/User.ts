import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the User model to enforce TypeScript typing
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

// Define the Mongoose schema for the User collection
const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
    match: /^[A-Za-z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100,
    match: /^[A-Za-z]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
});

// Export the User model to use it in other parts of the application
export default mongoose.model<IUser>("User", UserSchema);
