const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Image = mongoose.model("image", imageSchema);


module.exports = { Image };

