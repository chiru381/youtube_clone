import express from 'express';
import {
    addVideo, deleteVideo, getVideo, updateVideo, addView, trend, random, sub, getByTag, search 
} from '../controllers/video.js';
// import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//create video
router.post('/video', addVideo)

//update video
router.put('/:id', updateVideo)

//delete video
router.delete('/:id', deleteVideo)

//get video
router.get('/find/:id', getVideo)

router.put("/view/:id", addView)

router.get("/trend", trend)

router.get("/random", random)

router.get("/sub", sub)

router.get("/tags", getByTag)

router.get("/search", search)

export default router;