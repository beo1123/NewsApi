
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const categorySchema = new Schema(
    {

        title: {
            type: String,
            required: true,
            unique: true,
        },
        createBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        
    },
    {timestamps: true}

);
categorySchema.plugin(uniqueValidator);
module.exports = model("Category", categorySchema);