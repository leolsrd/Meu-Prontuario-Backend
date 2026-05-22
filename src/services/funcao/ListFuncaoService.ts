import prismaClient from "../../prisma";

class ListFuncaoService {
  async execute() {
    try {
      const funcoes = await prismaClient.funcao.findMany({
        select: {
          idFuncao: true,
          funcao: true,
          description: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          funcao: 'asc'
        }
      });

      return funcoes
    } catch (error) {
      throw new Error("Falha ao buscar as funções ", { cause: error })
    }
  }
}

export { ListFuncaoService }
