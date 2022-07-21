import express from "express"
const app = express();

import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import morgan from "morgan"
import cookieParser from "cookie-parser";

import userRouter from './routes/users.js'
import commentRouter from './routes/comments.js'
import videoRouter from './routes/videos.js'
import authRouter from './routes/auth.js'

dotenv.config({ path: "./config/config.env" });

//middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/videos", videoRouter);
app.use("/api/auth", authRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || "Something went wrong"

  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.get("/", (req, res) => {
  res.send("<h1> YoutubeClone Application</h1>");
});

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongo DB - Connected Successfully");
  })
  .catch((err) => {
    console.log(err)
  });

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`server connected ${process.env.PORT}`);
});