import { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getStories } from "../helpers/api";
import { Box } from "@mui/material";
import Story from "../components/Story";

type Story = {
  id: string;
  title: string;
  permalink: string;
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
          setStories([...data]);
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

  return (
    <Box sx={{
      mx: 3
    }}>
      { stories.map(story => (
        <Story {...story} key={story.id}/>
      ))}
    </Box>
  )
};

export default Stories;
