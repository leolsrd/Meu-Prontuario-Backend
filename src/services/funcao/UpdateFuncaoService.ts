import prismaClient from "../../prisma";
import { UpdateFuncaoServiceProps } from "../../@types/funcao.types";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { parseStatusUpdate } from "../../utils/parseBoolean.utils";

class UpdateFuncaoService {
  async execute(data: UpdateFuncaoServiceProps) {
    const nome = data.nome?.trim();
    const descricao = StringVaziaOrUndefinedSetNull(data.descricao);

    if (!data.idFuncao) {
      throw new Error("O id da função é obrigatório");
    }

    if (data.nome !== undefined && nome === "") {
      throw new Error("O nome da função é obrigatório");
    }

    const status = parseStatusUpdate(data.status);

    const idFuncaoExists = await prismaClient.funcao.findFirst({
      where: {
        idFuncao: data.idFuncao,
      },
    });

    if (!idFuncaoExists) {
      throw new Error("Função não encontrada");
    }

    const nomeFuncaoExists = await prismaClient.funcao.findFirst({
      where: {
        nome,
        idFuncao: {
          not: data.idFuncao,
        },
      },
    });

    if (nomeFuncaoExists?.status! === false) {
      throw new Error("Funcao com mesmo nome ja cadastrada, mas esta inativa");
    }

    if (nomeFuncaoExists) {
      throw new Error("Funcao com mesmo nome já cadastrada");
    }

    const funcaoUpdate = await prismaClient.funcao.update({
      where: {
        idFuncao: data.idFuncao,
      },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(nome !== undefined ? { nome } : {}),
        ...(descricao !== undefined ? { descricao } : {}),
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
  }
}

export default UpdateFuncaoService;
