import { Router } from "express";
import userRouter from "./userRoutes.js";
import feedRouter from "./feedRoutes.js";
import storyRouter from "./storyRoutes.js";

const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/feed", feedRouter);
appRouter.use("/story", storyRouter);

export default appRouter;
