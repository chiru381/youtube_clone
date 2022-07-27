import User from '../models/User.js'
import Video from '../models/Video.js'
import { createError } from '../error.js'

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({  ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {
          const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedVideo);
        } else {
          return next(createError(403, "You can update only your video!"));
        }
      } catch (err) {
        next(err);
      }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {
          await Video.findByIdAndDelete(req.params.id);
          res.status(200).json("The video has been deleted.");
        } else {
          return next(createError(403, "You can delete only your video!"));
        }
      } catch (err) {
        next(err);
      }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
      } catch (err) {
        next(err);
      }
}

export const addView = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1}
    })
    res.status(200).json("The view has been increased")
  } catch (error) {
    next(error);
  }
}

export const random = async (req, res, next) => {
  try {
    //size 1 in postman 1hit 1 video printed. for suppose 40 1 hit postman 40 videos printed.
    const videos = await Video.aggregate([{ $sample: { size: 40 }}])
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

export const trend = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1 })
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
}

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers

    //find all channels
    const list = await Promise.all(subscribedChannels.map(channelId => {
      return Video.find({ userId: channelId })
    }) )

    //[[{}, {}]] one array removed using flat method
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
}

export const getByTag = async (req, res, next) => {
  //split using seperating js, py, c
  const tags = req.query.tags.split(",")
  console.log(tags);
  try {
    //limit using one click postman 20 videos displayed
    const videos = await Video.find({ tags: { $in: tags}}).limit(20)
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
}

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    //$regex using search
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
}