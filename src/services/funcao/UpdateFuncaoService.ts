import prismaClient from "../../prisma";
import { UpdateFuncaoServiceProps } from "../../@types/funcao.types";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";

class UpdateFuncaoService {
  async execute({
    idFuncao,
    status,
    nome,
    descricao,
  }: UpdateFuncaoServiceProps) {
    try {
      const idFuncaoExists = await prismaClient.funcao.findFirst({
        where: {
          idFuncao: idFuncao,
        },
      });

      if (!idFuncaoExists) {
        throw new Error("Função nao encontrada");
      }

      if (nome === undefined || nome === "") {
        nome = idFuncaoExists?.nome;
      }

      const funcaoWithSameName = await prismaClient.funcao.findFirst({
        where: {
          nome: nome,
          idFuncao: {
            not: idFuncao,
          },
        },
      });

      if (funcaoWithSameName) {
        throw new Error("Funcao com mesmo nome ja cadastrada");
      }

      if (descricao === undefined || descricao === "") {
        descricao = StringVaziaOrUndefinedSetNull(descricao!);
      }

      if (typeof status === "string") {
        status = checkBoooleanStringConvertInBoolean(status);
      }

      const funcaoUpdate = await prismaClient.funcao.update({
        where: {
          idFuncao: idFuncao,
        },
        data: {
          status: status,
          nome: nome,
          descricao: descricao,
        },
        select: {
          idFuncao: true,
          status: true,
          nome: true,
          descricao: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return funcaoUpdate;
    } catch (error) {
      throw new Error("Falha ao atualizar a funcao", { cause: error });
    }
  }
}

export default UpdateFuncaoService;
