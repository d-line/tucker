import { Router } from "express";
import { verifyToken } from "../utils/tokens.js";
import { getStories, updateStory } from "../controllers/storyController.js";

const storyRouter = Router();
storyRouter.get("/", verifyToken, getStories);
storyRouter.patch("/:id", verifyToken, updateStory);

export default storyRouter;
