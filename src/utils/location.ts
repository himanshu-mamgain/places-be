import axios from "axios";
import { BadRequestError } from "./errors/BadRequestError";

const { GOOGLE_API_KEY } = process.env;

export const getCoordsFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_API_KEY}`
    );

    const data = response.data;

    if (!data || data.status === "ZERO_RESULTS") {
      throw new BadRequestError(
        "Could not find location for the specified address."
      );
    }

    return data.results[0].geometry.location;
  } catch (error) {
    return error;
  }
};
