import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListOperadoraService {
  async listOperadoraStatus(req: Request, res: Response, status: boolean) {
    try {
      const operadoras = await prismaClient.operadora.findMany({
        where: {
          status: status,
        },
        select: {
          idOperadora: true,
          nome: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          nome: "asc",
        },
      });

      return operadoras;
    } catch (error) {
      throw new Error("Falha ao buscar as operadoras ", { cause: error });
    }
  }
}

export { ListOperadoraService };
