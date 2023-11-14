import { connectToDatabase, disconnectFromDatabase } from "../db/connection.js";
import { config } from "dotenv";
import Feed from "../models/Feed.js";
import axios from "axios";
import Parser from "rss-parser";
import moment from "moment";
import Story from "../models/Story.js";
import { getEntryId, isYoutube, parser } from "./discover.js";

config();

const getPubDate = (rawStory: any): Date => {
  if (rawStory.pubDate) return moment(rawStory.pubDate).toDate();
  if (rawStory["maz:modified"]) {
    return new Date(parseInt(rawStory["maz:modified"], 10));
  }
  return new Date();
};


const addStory = async (rawStory, feed) => {
  const createStory = {
    feed,
    title: rawStory.title,
    permalink: rawStory.link || rawStory.enclosure.url,
    body: isYoutube(rawStory) || rawStory["content:encoded"] || "",
    published: getPubDate(rawStory),
    isRead: false,
    keepUnread: false,
    isStarred: false,
    entryId: getEntryId(rawStory),
  };

  try {
    const savedStory = await Story.create(createStory);
    console.log(
      `[ NEW STRY ] => ${createStory.title} (${createStory.permalink})`
    );
    return savedStory;
  } catch (err) {
    if (err.code !== 11000) {
      console.error(
        `${err} => ${JSON.stringify(createStory)} <= ${JSON.stringify(
          rawStory
        )}`
      );
      return false;
    }
  }
  return false;
};

const modifyFeed = async (rawFeed, feed) => {
  let isNewStory: any = false;
  await Promise.all(
    rawFeed.items.map(async (story) => {
      isNewStory = await addStory(story, feed);
      return isNewStory;
    })
  );

  if (isNewStory) {
    const lastFetched = moment().toDate();
    feed.lastFetched = lastFetched;
    await feed.save();
    console.log(`[ LST FTCH ] => ${lastFetched} for ${feed.url} ${feed.name}`);
  }
};

const setFeedStatus = async (feed, status) => {
  Object.assign(feed, { status });
  await feed.save();
  console.log(`[  STATUS  ] ${status} for ${feed.url} ${feed.name}`);
};

const fetchFeed = async (feed) => {
  try {
    const { data } = await axios.get(feed.url, {
      headers: {
        accept: "application/rss+xml",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4.1 Safari/605.1.15",
      },
    });
    const parsed = await parser.parseString(data);
    await modifyFeed(parsed, feed);
    await setFeedStatus(feed, 0);
  } catch (error) {
    await setFeedStatus(feed, 2);
    console.log(error);
  }
};

connectToDatabase()
  .then(async () => {
    const feeds = await Feed.find();
    await Promise.all(
      feeds.map(async (f) => {
        await fetchFeed(f);
      })
    );
  })
  .then(() => disconnectFromDatabase())
  .catch((error) => console.error(error));
