
const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const storySchema = new Schema(
    {

        title: {
            type: String,
            required: true,
            
        },
        createBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
        imageUrl: {
            type: String,
            required: true,
            
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,           
        },
        viewCounts: {
            type: Number,
            default: 0,
            
        },
        
        
    },
    {timestamps: true}

);
storySchema.plugin(uniqueValidator);
module.exports = model("Story", storySchema);