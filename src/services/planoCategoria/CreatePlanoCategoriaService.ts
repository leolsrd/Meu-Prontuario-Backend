import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { PlanoCategoriaServiceProps } from "../../@types/planoCategoria.types";
import { returnError } from "../../utils/returnError";

class CreatePlanoCategoriaService {
  async execute(req: Request, res: Response, data: PlanoCategoriaServiceProps) {
    try {
      const operadoraForIdOperadoraExists =
        await prismaClient.planoCategoria.findFirst({
          where: {
            nome: data.nome,
            idOperadora: data.idOperadora,
          },
        });

      if (operadoraForIdOperadoraExists) {
        returnError({
          messageConsole: "Plano Categoria ja cadastrada para essa operadora",
          statusCode: 400,
          messageApi: "Plano Categoria ja cadastrada para essa operadora",
          res,
        });
      }

      const planoCategoria = await prismaClient.planoCategoria.create({
        data: {
          ...data,
        },
      });

      return planoCategoria;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreatePlanoCategoriaService };
