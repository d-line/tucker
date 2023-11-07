import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

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
          onSubmit={handleSubmit}
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
              Login
            </Typography>
            <TextField id="password" type="password" name="password" label="Password" />
            <Button
              variant="outlined"
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
