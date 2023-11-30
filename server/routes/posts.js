import express from "express";
import { getFeedPosts,likePost,getUserPosts } from "../controllers/posts.js";
import { check_token } from "../middleware/auth.js";

const router = express.Router();

// Read

router.get("/",check_token,getFeedPosts);
router.get("/:userId/posts",check_token,getUserPosts);

// Update 

router.patch("/:id/like",likePost);
   
export default router;