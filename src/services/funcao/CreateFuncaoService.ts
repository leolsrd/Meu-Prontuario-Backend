import { CreateFuncaoServiceProps } from "../../@types/funcao.types";
import prismaClient from "../../prisma";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { returnError } from "../../utils/returnError";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";

class CreateFuncaoService {
  async execute(data: CreateFuncaoServiceProps) {
    const nome = data.nome?.trim();
    const descricao = StringVaziaOrUndefinedSetNull(data.descricao);

    if (!nome) {
      throw new Error("O nome da funcao é obrigatório");
    }

    const nomeFuncaoExists = await prismaClient.funcao.findFirst({
      where: {
        nome,
      },
    });

    if (nomeFuncaoExists && nomeFuncaoExists?.status === false) {
      throw new Error("Função já cadastrada, mas está inativa");
    }

    if (nomeFuncaoExists) {
      throw new Error("Função já cadastrada");
    }

    const funcaoWithSameName = await prismaClient.funcao.findFirst({
      where: {
        nome: data.nome,
        idFuncao: {
          not: data.idFuncao,
        },
      },
    });

    if (funcaoWithSameName && funcaoWithSameName?.status === false) {
      throw new Error("Função já cadastrada, mas está inativa");
    }

    const status = checkBoooleanStringConvertInBoolean(data.status);

    const funcao = await prismaClient.funcao.create({
      data: {
        nome: data.nome,
        descricao,
        status,
      },
    });

    return funcao;
  }
}

export { CreateFuncaoService };
