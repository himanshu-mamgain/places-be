import Joi, { ObjectSchema } from "joi";
import { ICreatePlace, IUpdatePlace } from "./place.interface";
import { Types } from "mongoose";

export const createPlaceSchema: ObjectSchema<ICreatePlace> =
  Joi.object<ICreatePlace>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    creator: Joi.string().required(),
  });

export const getPlaceByIdSchema: ObjectSchema<{ placeId: Types.ObjectId }> =
  Joi.object<{ placeId: Types.ObjectId }>({
    placeId: Joi.string().required(),
  });

export const getPlaceByUserIdSchema: ObjectSchema<{ userId: Types.ObjectId }> =
  Joi.object<{ userId: Types.ObjectId }>({
    userId: Joi.string().required(),
  });

export const updatePlaceSchema: ObjectSchema<IUpdatePlace> =
  Joi.object<IUpdatePlace>({
    placeId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

export const deletePlaceSchema: ObjectSchema<{ placeId: Types.ObjectId }> =
  Joi.object<{ placeId: Types.ObjectId }>({
    placeId: Joi.string().required(),
  });
