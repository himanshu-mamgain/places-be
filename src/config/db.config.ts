import mongoose from "mongoose";
import "dotenv/config";
import { PreconditionError } from "../utils/errors/PreconditionError";

const { DATABASE_URL } = process.env;

const AppDataSource = async (): Promise<mongoose.Connection> => {
  const dbConnUrl: string = DATABASE_URL!;

  try {
    await mongoose.connect(dbConnUrl);
  } catch (error) {
    console.error("Database Connection url is missing!");
  }

  const db = mongoose.connection;

  db.on("error", (err: any) => console.error(err?.message));

  db.once("connected", () =>
    console.log("Successfully connected to database!")
  );

  return db;
};

export default AppDataSource;
