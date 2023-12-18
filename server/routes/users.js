import express from "express";
import{ getUser,getUserFriends,addRemoveFriend } from "../controllers/users.js";
import { check_token } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/:id",check_token,getUser);
router.get("/:id/friends",check_token,getUserFriends);

// Update
router.patch("/:id/:friendId", addRemoveFriend);

  
export default router;

