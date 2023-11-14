import rssFinder from "rss-finder";
import { NextFunction } from "express";
import Parser from "rss-parser";

export const parser = new Parser({
  customFields: {
    item: ["media:group", "maz:modified"],
  },
});

export const isYoutube = (rawStory): string => {
  if (rawStory["media:group"] !== undefined) {
    const url = rawStory["media:group"]["media:content"][0].$.url;
    const thumbnail = rawStory["media:group"]["media:thumbnail"][0].$.url;
    return `<div class="youtube"><a href="${url}"><img src="${thumbnail}"></a></div>`;
  }
  return rawStory.content;
};

export const getEntryId = (rawStory: any): string => {
  if (rawStory.guid && typeof rawStory.guid === "string") {
    return rawStory.guid;
  }
  return rawStory.id || rawStory.link;
};

export const getFeedForURL = async (url: string, next: NextFunction) => {
  const response = await fetch(url);

  let charset;
  const buff = await response.arrayBuffer();
  if (response.headers.has("content-type")) {
    const contentType = response.headers
      .get("content-type")
      ?.toLocaleLowerCase();
    if (contentType && contentType.indexOf("charset") > -1) {
      [charset] = contentType.split("=").slice(-1);
    }
  }
  if (!charset) charset = "utf-8";
  const decoder = new TextDecoder(charset);
  const str = decoder.decode(buff);

  try {
    const feed = await parser.parseString(str);
    feed.feedUrl = feed.feedUrl || url;
    return feed;
  } catch (err) {
    return next();
  }
};

export const discoverFeed = async (url: string) => {
  return getFeedForURL(url, async () => {
    const found = await rssFinder(url);
    if (found.feedUrls.length > 0) {
      return getFeedForURL(found.feedUrls[0].url, () => false);
    }
    return false;
  });
};
