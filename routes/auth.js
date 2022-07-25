import express from 'express';
import { signup, signin, googleAuth } from '../controllers/auth.js';

const router = express.Router();

//create user
router.post("/signup", signup )

//signin a user
router.post("/signin", signin )

//login with google
router.post("/google", googleAuth )

export default router;