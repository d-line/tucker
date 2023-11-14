import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getFeeds } from "../helpers/api";

type Feed = {
  id: string;
  name: string;
  url: string;
};

const Feeds = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Feeds", { id: "loadFeeds" });
      getFeeds()
        .then((data) => {
          setFeeds([...data]);
          toast.success("Successfully loaded feeds", { id: "loadFeeds" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadFeeds" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return <pre style={{'textAlign': 'left'}}>{JSON.stringify(feeds, null, 2)}</pre>;
};

export default Feeds;
