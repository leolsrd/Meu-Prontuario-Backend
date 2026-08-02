import prismaClient from "../../prisma";
import { PlanoCategoriaServiceProps } from "../../@types/planoCategoria.types";

class UpdatePlanoCategoriaService {
  async execute(data: PlanoCategoriaServiceProps) {
    const nome = data.nome?.trim();

    if (!nome) {
      throw new Error("O nome da plano categoria é obrigatório");
    }

    const planoCategoriaExists = await prismaClient.planoCategoria.findFirst({
      where: {
        idPlanoCategoria: data.idPlanoCategoria,
      },
    });

    if (!planoCategoriaExists) {
      throw new Error("Plano Categoria não encontrada");
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
      throw new Error("Plano Categoria já cadastrada para essa operadora");
    }

    const planoCategoria = await prismaClient.planoCategoria.update({
      where: {
        idPlanoCategoria: data.idPlanoCategoria,
        idOperadora: data.idOperadora,
      },
      data: {
        ...data,
      },
    });

    return planoCategoria;
  }
}

export { UpdatePlanoCategoriaService };
