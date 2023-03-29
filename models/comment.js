
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {

        story: {
            type: Schema.Types.ObjectId,
            ref: "Story",
        },
       
        createBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
       
        body: {
            type: String,
            require: true,
        },
        

         

        
        
    },
    {timestamps: true}

);

module.exports = model("Comment", commentSchema);