import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export function validateSchema(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as any;

      req.body = validated.body;

      // Para query e params, usamos Object.assign para modificar os valores internos
      // sem quebrar a regra de "somente leitura" do Express
      if (validated.query) Object.assign(req.query, validated.query);
      if (validated.params) Object.assign(req.params, validated.params);

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Erro de validação de dados", error);
        return res.status(400).json({
          error: "Erro de validação de dados",
          details: error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path,
          })),
        });
      }

      return next(error);
    }
  };
}
