import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { subscribe } from "../helpers/api";

const Subscribe = () => {

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;

    try {
        toast.loading("Subscribing", { id: "subscribe" });
        await subscribe(url);
        toast.success("Feed Added Successfully", { id: "subscribe" });
    } catch (error) {
        console.log(error);
        toast.error("Subscribe Failed", { id: "subscribe" });
    }
  }

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubscribe}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "3px 3px 20px #aaa",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Add Feed URL
            </Typography>
            <TextField
              id="url"
              type="text"
              name="url"
              label="URL"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "600px",
                borderRadius: 2,
              }}
              endIcon={<IoIosAddCircle />}
            >
              Subscribe
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Subscribe;
