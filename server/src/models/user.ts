// create the user model
import mongoose, { mongo } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true
    },
    email: {
        unique: true,
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    imageArrsy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image",
        }
    ]

})
export default mongoose.models.User ||
    mongoose.model("User", userSchema)