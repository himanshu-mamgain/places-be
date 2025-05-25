import Joi, { ObjectSchema } from "joi";

export const getUserById: ObjectSchema<{ id: string }> = Joi.object<{
  id: string;
}>({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),
});
