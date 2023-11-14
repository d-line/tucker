import { Router } from "express";
import { verifyToken } from "../utils/tokens.js";
import { getStories } from "../controllers/storyController.js";

const storyRouter = Router();
storyRouter.get("/", verifyToken, getStories);

export default storyRouter;
