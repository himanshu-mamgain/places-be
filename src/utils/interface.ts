import { Types } from "mongoose";

export interface IPagination {
  skip: number;
  take: number;
}

export interface IServiceResponse {
  statusCode: number;
  payload: object;
  message: string;
}

export interface IResponse {
  isSuccess: (statusCode: number) => boolean;
  sendResponse: (
    res: Response,
    statusCode: number,
    payload?: object,
    message?: string
  ) => void;
  serviceResponse: (
    statusCode: number,
    payload: object,
    message: string
  ) => IServiceResponse;
}

export interface ICreateToken {
  id: Types.ObjectId;
  name: string;
  email: string;
}

export interface IGetRequestUser {
  id: string;
  name: string;
  email: string;
}

export interface GeocodingResults {
  geometry: IGeometry;
}

export interface IGeometry {
  lat: number;
  lng: number;
}

export interface IStatus {
  code: number;
  message: string;
}

export interface GeocodingResponse {
  documentation: string;
  results: GeocodingResults[];
  status: IStatus;
}

export interface ICloudinaryResponse {
  secureUrl: string;
  url: string;
}