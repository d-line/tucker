import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getStories } from "../helpers/api";

type Story = {
  id: string;
  title: string;
};

const Stories = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>([]);

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Stories", { id: "loadStories" });
      getStories()
        .then((data) => {
          setStories([...data.stories]);
          toast.success("Successfully loaded stories", { id: "loadStories" });
         })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadStories" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return <div>Stories</div>;
};

export default Stories;
