import { NextFunction, Request, Response } from "express";
import Story from "../models/Story.js";

export const getStories = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const stories = await Story.find({isRead: false}).sort({ published: -1 }).limit(1000).populate("feed");
    return res.status(200).json(
      stories.map((story) => ({
        id: story._id,
        title: story.title,
        permalink: story.permalink,
        body: story.body,
        feed: story.feed,
        published: story.published,
        isRead: story.isRead,
        keepUnread: story.keepUnread,
        isStarred: story.isStarred,
        entryId: story.entryId,
      }))
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};

export const updateStory = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id;
    const story = await Story.findById(id);
    const { isRead } = req.body
    if (!story) {
      return res.status(404).json({ message: "ERROR", cause: 'Story not found' });
    }
    story.isRead = isRead;
    const newStory = await story.save();
    return res.status(200).json({
      id: newStory._id,
      title: newStory.title,
      permalink: newStory.permalink,
      body: newStory.body,
      feed: newStory.feed,
      published: newStory.published,
      isRead: newStory.isRead,
      keepUnread: newStory.keepUnread,
      isStarred: newStory.isStarred,
      entryId: newStory.entryId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};
