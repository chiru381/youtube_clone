import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createError } from '../error.js';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        // console.log(newUser);
        await newUser.save()
        res.status(200).send("User has been created successfully")
    } catch (error) {
        next(createError(404, "not found"));
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(404, "Invalid password"));

        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY)
        const { password, ...otherDetails } = user._doc

        res.cookie("access-token", token, {
            httpOnly: true
        }).status(200).json(otherDetails)
    } catch (error) {
        next(error)
    }
};

//firebase user uid  -  QFaY550nl3Ql0x4rvj8Qr19S3Jt2
export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user, '.....1');
        if (user) {
          const token = jwt.sign({ id: user._id }, process.env.JWT);
          console.log(token, '...2');
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(user._doc);
        } else {
          const newUser = new User({
            ...req.body,
            fromGoogle: true,
          });
          console.log(newUser, '....3');
          const savedUser = await newUser.save();
          console.log(savedUser, '...4');
          const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
          console.log(token, '...5');
          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(savedUser._doc);
        }
      } catch (err) {
        next(err);
      }
};