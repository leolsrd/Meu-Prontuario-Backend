import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListPlanoCategoriaService {
  async execute(req: Request, res: Response) {
    try {
      const planoCategorias = await prismaClient.planoCategoria.findMany({
        select: {
          idPlanoCategoria: true,
          nome: true,
          operadora: {
            select: {
              idOperadora: true,
              nome: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          // nome: "asc",
          operadora: {
            nome: "asc",
          },
        },
      });

      return planoCategorias;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { ListPlanoCategoriaService };
