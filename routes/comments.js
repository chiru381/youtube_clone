import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();

//create a new comment
router.post("/", addComment)

//delete a comment
router.delete("/:id", verifyToken, deleteComment)

//get videoId
router.get("/:videoId", getComments)

export default router;