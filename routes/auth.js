import express from 'express';
import { signup, signin, googleAuth } from '../controllers/auth.js';

const router = express.Router();

//create user
router.post("/signup", signup )

//signin
router.post("/signin", signin )

//google auth
router.post("/google", googleAuth )

export default router;