
const { Schema, model } = require("mongoose");

const videoSchema = new Schema(
    {

        videoId: {
            type: String,
            require : true,
        },
       
        title: {
            type: String,
            require: true,
        },
       
        createBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        viewCounts: {
            type: Number,
            default: 0,
            
        },
        

         

        
        
    },
    {timestamps: true}

);

module.exports = model("Video", videoSchema);