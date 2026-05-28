import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
// import { errorHandle } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

// app.use(errorHandle);

app.use((error: Error, _: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333 🚀");
});
