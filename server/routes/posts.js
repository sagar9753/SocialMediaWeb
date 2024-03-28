import express from "express";
import { getFeedPosts,likePost,doComment,getUserPosts,deletePost } from "../controllers/posts.js";
import { check_token } from "../middleware/auth.js";

const router = express.Router();

// Read

router.get("/",check_token,getFeedPosts);
router.get("/:userId/posts",check_token,getUserPosts);
router.post("/:id/comment",check_token, doComment);

// Update 

router.patch("/:id/like",check_token, likePost);
router.patch("/:userId/:id",check_token,deletePost);

export default router;