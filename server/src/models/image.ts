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
        require: true
    },
    publicId: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    secureUrl: {
        type: String,
        require: true
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

})
export default mongoose.models.Image ||
    mongoose.model("Image", imageSchema);