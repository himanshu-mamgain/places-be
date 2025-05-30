import Joi, { ObjectSchema } from "joi";
import { ICreatePlace, IUpdatePlace } from "./place.interface";

export const createPlaceSchema: ObjectSchema<ICreatePlace> =
  Joi.object<ICreatePlace>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
  });

export const getPlaceByIdSchema: ObjectSchema<{ placeId: string }> =
  Joi.object<{ placeId: string }>({
    placeId: Joi.string().required(),
  });

export const getPlaceByUserIdSchema: ObjectSchema<{ userId: string }> =
  Joi.object<{ userId: string }>({
    userId: Joi.string().required(),
  });

export const updatePlaceSchema: ObjectSchema<IUpdatePlace> =
  Joi.object<IUpdatePlace>({
    placeId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

export const deletePlaceSchema: ObjectSchema<{ placeId: string }> =
  Joi.object<{ placeId: string }>({
    placeId: Joi.string().required(),
  });
