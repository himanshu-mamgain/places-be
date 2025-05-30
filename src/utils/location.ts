import axios, { HttpStatusCode } from "axios";
import { BadRequestError } from "./errors/BadRequestError";
import { GeocodingResponse } from "./interface";

const { GEOCODING_API_KEY } = process.env;

export const getCoordsFromAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      )}&key=${GEOCODING_API_KEY}`
    );

    const data: GeocodingResponse = response.data;

    if (!data || data.status.code !== 200) {
      throw new BadRequestError(
        "Could not find location for the specified address."
      );
    }

    return data.results[0].geometry;
  } catch (error) {
    return error;
  }
};
