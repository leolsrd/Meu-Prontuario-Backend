import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import globalRouter from "./routes/index";

const app = express();

app.use(express.json());

app.use(cors());

app.use(globalRouter);

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
