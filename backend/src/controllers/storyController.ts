import { NextFunction, Request, Response } from "express";
import Story from "../models/Story.js";

export const getStories = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const stories = await Story.find().sort({ published: -1 }).populate('feed');
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
