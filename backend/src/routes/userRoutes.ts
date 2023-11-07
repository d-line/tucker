import { Router } from "express";
import { getUser, userLogin, userSignup, userVerify } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokens.js";

const userRouter = Router();
userRouter.get("/", getUser);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, userVerify);

export default userRouter;
