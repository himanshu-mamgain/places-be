import express, { Express, NextFunction, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { NotFoundError } from "./utils/errors/NotFoundError";
import errorHandler from "./utils/error.handler";
import AppDataSource from "./config/db.config";
import { routes } from "./routes";

class App {
  public app: Express;
  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.text());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.use(
      helmet({
        crossOriginResourcePolicy: {
          policy: "cross-origin",
        },
      })
    );
    this.app.use(morgan("dev"));
    this.app.use(
      "/api/uploads/images",
      express.static(path.join(__dirname, "..", "uploads", "images"))
    );
  }

  configureRoutes() {
    this.app.use("/api", routes);
    this.app.use(
      "/api/health",
      (_req: Request, res: Response, _next: NextFunction) => {
        return res.send("Health check is working");
      }
    );
    this.app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
      return next(new NotFoundError("Route not found"));
    });
    this.app.use(errorHandler);
  }

  async start(port: number) {
    await this.connectToDb();

    this.app.listen(port, () => {
      console.info("----------------------------------------------------");
      console.info(`[Server]: Server is running on ${port}`);
      console.info(`Time : ${new Date()}`);
      console.info("----------------------------------------------------");
    });
  }

  private async connectToDb() {
    await AppDataSource();
  }
}

const app = new App();

export { app };
