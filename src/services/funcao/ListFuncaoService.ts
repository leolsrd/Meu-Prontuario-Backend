// import prisma from "../../prisma";
import prismaClient from "../../prisma";

class ListFuncaoService {
  async execute() {
    try {
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

      return funcoes;
    } catch (error) {
      throw new Error("Falha ao buscar as funções ", { cause: error });
    }
  }
}

export { ListFuncaoService };
