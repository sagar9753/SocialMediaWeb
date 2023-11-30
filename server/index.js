import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import multer from "multer";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import Post from "./models/Post.js";
import auth_routes from "./routes/auth.js";
import user_routes from "./routes/users.js"
import post_routes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { check_token } from "./middleware/auth.js";
import { users, posts } from "./data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Routes with files 
app.get("/", (req, res) => {
    res.send("Hello");
})
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",check_token, upload.single("picture"), createPost);

// Routes
app.use("/auth", auth_routes);
app.use("/users", user_routes);
app.use("/posts", post_routes);

// Conection with Mongoose--------------------------------  

const URL = `mongodb+srv://sagar9753:sbs&9753@cluster0.ylrsqob.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`
const PORT = process.env.PORT || 6000;
console.log(PORT, process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`con successfull on Port : ${PORT}`));
    // Add data one Time
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((err) => console.log(`Con unsuccessfl, Error : ${err}`));




