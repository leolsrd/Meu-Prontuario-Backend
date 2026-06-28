import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { PlanoCategoriaServiceProps } from "../../@types/planoCategoria.types";
import { returnError } from "../../utils/returnError";

class UpdatePlanoCategoriaService {
  async execute(req: Request, res: Response, data: PlanoCategoriaServiceProps) {
    try {
      const planoCategoriaExists = await prismaClient.planoCategoria.findFirst({
        where: {
          idPlanoCategoria: data.idPlanoCategoria,
        },
      });

      if (!planoCategoriaExists) {
        returnError({
          messageConsole: "Plano Categoria não cadastrada",
          statusCode: 400,
          messageApi: "Plano Categoria não cadastrada",
          res,
        });
        return;
      }

      const planoCategoriaWithSameName =
        await prismaClient.planoCategoria.findFirst({
          where: {
            nome: data.nome,
            idOperadora: data.idOperadora,
            idPlanoCategoria: {
              not: data.idPlanoCategoria,
            },
          },
        });

      if (planoCategoriaWithSameName) {
        returnError({
          messageConsole: "Plano Categoria já cadastrada para essa operadora",
          statusCode: 400,
          messageApi: "Plano Categoria já cadastrada para essa operadora",
          res,
        });
        return;
      }

      const planoCategoria = await prismaClient.planoCategoria.update({
        where: {
          idPlanoCategoria: data.idPlanoCategoria,
        },
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

export { UpdatePlanoCategoriaService };
