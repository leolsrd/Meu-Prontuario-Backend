import prismaClient from "../../prisma";

class ListFuncaoService {
  async execute() {
    const funcoes = await prismaClient.funcao.findMany({
      select: {
        idFuncao: true,
        nome: true,
        descricao: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    if (!funcoes) {
      throw new Error("Nenhuma função encontrada");
    }

    return funcoes;
  }
}

export { ListFuncaoService };
