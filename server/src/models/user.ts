// create the user model
import mongoose, { mongo } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageArrsy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
        }
    ]

},{ timestamps: true });
export default mongoose.models.User ||
    mongoose.model("User", userSchema)