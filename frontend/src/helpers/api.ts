import axios from "axios";

export const loginUser = async (password: string) => {
  const res = await axios.post("/user/login", { password });
  if (res.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await res.data;
  return data;
};

export const getStories = async () => {
  const res = await axios.get("/story");
  if (res.status !== 200) {
    throw new Error("Stories fetch failed");
  }
  const data = await res.data;
  return data;

}


export const getFeeds = async () => {
  const res = await axios.get("/feed");
  if (res.status !== 200) {
    throw new Error("Feeds fetch failed");
  }
  const data = await res.data;
  return data;

}

export const subscribe = async (feedUrl: string) => {
  const req = {
    url: feedUrl
  }
  const res = await axios.post("/feed", req);
  if (res.status !== 201) {
    throw new Error("Feed subscibe failed");
  }
  const data = await res.data;
  return data;
}

export const updateStory = async(id: string, body: unknown) => {
  const res = await axios.patch(`/story/${id}`, body);
  if (res.status !== 200) {
    throw new Error("Story update failed");
  }
  const data = await res.data;
  return data;

}
