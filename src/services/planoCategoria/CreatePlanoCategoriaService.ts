import prismaClient from "../../prisma";
import { PlanoCategoriaServiceProps } from "../../@types/planoCategoria.types";

class CreatePlanoCategoriaService {
  async execute(data: PlanoCategoriaServiceProps) {
    let nome = data.nome?.trim();
    let idOperadora = data.idOperadora?.trim();

    if (!nome) {
      throw new Error("O nome da plano categoria é obrigatório");
    }

    if (!idOperadora) {
      throw new Error("O id da operadora é obrigatório");
    }

    const operadoraForIdOperadoraExists =
      await prismaClient.planoCategoria.findFirst({
        where: {
          nome: data.nome,
          idOperadora: data.idOperadora,
        },
      });

    if (operadoraForIdOperadoraExists) {
      throw new Error("Plano Categoria já cadastrada para essa operadora");
    }

    const planoCategoria = await prismaClient.planoCategoria.create({
      data: {
        ...data,
      },
    });

    return planoCategoria;
  }
}

export { CreatePlanoCategoriaService };
