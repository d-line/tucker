import { NextFunction, Request, Response } from "express";
import Feed from "../models/Feed.js";
import { discoverFeed, getEntryId, isYoutube } from "../utils/discover.js";
import Story from "../models/Story.js";

export const getFeeds = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const feeds = await Feed.find();
    return res.status(200).json(
      feeds.map((feed) => ({
        id: feed._id,
        name: feed.name,
        url: feed.url,
        lastFetched: feed.lastFetched,
      }))
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};

export const feedSubscribe = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { url } = req.body;
    const discovered = await discoverFeed(url);
    if (!discovered) {
      return res.status(500).json({
        message: "ERROR",
        cause: `Can't discover feed for URL ${url}`,
      });
    }

    const existingFeed = await Feed.findOne({ url: discovered.feedUrl });

    if (existingFeed) {
      return res.status(401).json({
        message: "ERROR",
        cause: `Feed with URL ${discovered.feedUrl} already exists`,
      });
    }
    const feed = new Feed({
      name: discovered.title,
      url: discovered.feedUrl,
      lastFetched: new Date(0),
    });
    await feed.save();
    await Promise.all(
      discovered.items.map(async (item) => {
        const story = new Story({
          title: item.title,
          permalink: item.link,
          body: isYoutube(item) || item["content:encoded"] || "",
          feed,
          published: new Date(item.pubDate),
          entryId: getEntryId(item)
        });
        await story.save();
      })
    );
    let maxDate = new Date(discovered.items.reduce(
      (acc, cur) => {
        const curDate = new Date(cur.pubDate);
        return acc.getTime() > curDate.getTime() ? acc : curDate;
      }, new Date(discovered.items[0].pubDate)
    ));
    feed.lastFetched = maxDate;
    await feed.save();
    return res.status(201).json(feed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error });
  }
};
