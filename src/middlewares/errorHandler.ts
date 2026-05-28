import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandle = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor";

  console.log(`[ERROR] ${err.stack}`);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
