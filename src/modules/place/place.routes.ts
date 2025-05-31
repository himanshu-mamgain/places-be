import { Router } from "express";
import validatePayload from "../../middleware/validatePayload";
import {
  createPlaceSchema,
  deletePlaceSchema,
  getPlaceByIdSchema,
  getPlaceByUserIdSchema,
  updatePlaceSchema,
} from "./place.validator";
import placeController from "./place.controller";
import authorizer from "../../middleware/authorizer";
import fileUpload from "../../middleware/fileUpload";

const router: Router = Router();

router.post(
  "/",
  authorizer(),
  fileUpload(),
  validatePayload(createPlaceSchema),
  placeController.createPlace
);

router.get(
  "/user/:userId",
  authorizer(),
  validatePayload(getPlaceByUserIdSchema),
  placeController.getPlacesByUserId
);

router
  .route("/:placeId")
  .get(
    authorizer(),
    validatePayload(getPlaceByIdSchema),
    placeController.getPlaceById
  )
  .patch(
    authorizer(),
    validatePayload(updatePlaceSchema),
    placeController.updatePlace
  )
  .delete(
    authorizer(),
    validatePayload(deletePlaceSchema),
    placeController.deletePlace
  );

export default router;
