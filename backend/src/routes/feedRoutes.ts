import { Router } from "express";
// import { getUser, userLogin, userSignup, userVerify } from "../controllers/userController.js";
// import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/tokens.js";
import { feedSubscribe, getFeeds } from "../controllers/feedController.js";
import { subscribeValidator, validate } from "../utils/validators.js";

const feedRouter = Router();
feedRouter.get("/", verifyToken, getFeeds);
feedRouter.post("/", verifyToken, validate(subscribeValidator), feedSubscribe);

export default feedRouter;
