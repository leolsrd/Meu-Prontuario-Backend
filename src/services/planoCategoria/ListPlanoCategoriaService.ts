import prismaClient from "../../prisma";

class ListPlanoCategoriaService {
  async execute() {
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
        operadora: {
          nome: "asc",
        },
      },
    });

    return planoCategorias;
  }
}

export { ListPlanoCategoriaService };
