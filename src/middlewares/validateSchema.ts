import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

export function validateSchema(schema: ZodType) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Erro de validação de dados",
          details: error.issues.map((issue) => ({
            message: issue.message, path: issue.path, value: error.issues[0]?.input
          })),
        });
      }
      next(error);
    }
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
