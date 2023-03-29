
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "Avatar-Profile-Vector-PNG.png"
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],

        },
        password: {
            type: String,
            required: true,
        },
        verification: {
            type: Number,
            
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        passwordResetCode: {
            type: String,
            
        },
    },
    {timestamps: true}

);

module.exports = model("User", userSchema);