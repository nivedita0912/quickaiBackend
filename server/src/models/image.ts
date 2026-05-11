// create the user model
import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({

    imgType: {
        type: String,
        enum: [
            "restore",
            "remove",
            "fill",
            "recolor",
            "bgremove"
        ],
        required: true
    },
    transformation: {
        unique: true,
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    secureUrl: {
        type: String,
        required: true
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    config: {
        type: Object
    },
    transfromation: {
        type: String
    },
    aspectRatio: {
        type: String
    },
    color: {
        type: String
    },
    prompt:{
        type:String,
        require:true
    },
    createdat: {
        type: Date
    },

},{ timestamps: true });
export default mongoose.models.Image ||
    mongoose.model("Image", imageSchema);