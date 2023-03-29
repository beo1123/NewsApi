const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        version: "1.0.0"
    },
    host: "localhost:5000",
    basePath: "/",
    schames: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Auth",
            "description": "Auth Endpoints"
        },
        {
            "name": "Admin",
            "description": "Admin Endpoints"
        },
        {
            "name": "Posts",
            "description": "Posts Endpoints"
        },
        {
            "name": "Profile",
            "description": "User Profile Endpoints"
        },
    ],
    securityDefinitions: {
        Authorization: {
            type: "apiKey",
            name: "Authorization",
            description: "value: Bearer ",
            in: "header",
            scheme: 'bearer'
        }
    },

    definition: {
        LoginModel: {
            $email: "vbao964@gmail.com",
            $password: "quocbao1123"
        },
        RegisterModel: {
            $name: "Quoc Bao",
            $email: "vobao5689@gmail.com",
            $password: "quocbao1123"
        },
        UpdateUserModel: {
            $name: "Quoc Bao",
        },
        CategoryModel: {
            $title: "Comedy",
        },
        StoryModel: {
            $category: "6064e654b5c7475bac63ad22",
            $title: "Elon Musk Admits He Wants to Travel to Mars Because No One Hates Him There Yet",
            $body: "AUSTIN, Texas — Wiping tears from his eyes at a recent press conference, SpaceX CEO Elon Musk revealed that the reason he’s so keen on traveling to Mars is not for the potential benefits to science, but because it’s the one place he can think of where no one hates him yet.",
        },
        VideoModel: {
            $videoId: "QWhJqvuB1ZA",
            $title: "Welcome To America with Gad Elmaleh and Ron Livingston",            
        },
        CommentModel: {
            $story: "606576d16bb28e33ecf2872c",
            $body: "That's very funny (:",
        },
        VerifyEmailModel: {
            $code: 333333,
        }, 
        ChangePasswordModel: {
            $oldPassword: "quocbao1123",
            $newPassword: "quocbao11234",
        }, 
        ForgotPassWordModel: {
            $email: "vu123@gmail.com",
        },
        ResetPasswordModel: {
            $email: "vu123@gmail.com",
            $code: 999999,
            $newPassword: "quocbao1123",
        }
    }

};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./index");
});