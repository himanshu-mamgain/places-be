import { Router } from "express";
import placeRouter from "./modules/place/place.routes";
import userRouter from "./modules/user/user.routes";

const routes: Router = Router();

routes.use("/users", userRouter);
routes.use("/places", placeRouter);

export { routes };
