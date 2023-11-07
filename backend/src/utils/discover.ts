import rssFinder from "rss-finder";
import Parser from "rss-parser";
import { NextFunction } from "express";

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

  const parser = new Parser();
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
