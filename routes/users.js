import express from 'express';
import { updateUser, getUser, deleteUser, subscribe, unsubscribe, like, dislike } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//update user
router.put('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

//get user
router.get('/find/:id', getUser)

//subscribe a user
router.put('/sub/:id', subscribe)

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe)

//like a video
router.put('/like/:videoId', like)

//dislike a video
router.put('/dislike/:videoId', dislike)


export default router;