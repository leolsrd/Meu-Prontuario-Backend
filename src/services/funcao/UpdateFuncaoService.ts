import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { returnError } from "../../utils/returnError";
import { UpdateFuncaoServiceProps } from "../../@types/funcao.types";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";

class UpdateFuncaoService {
  async execute(
    req: Request,
    res: Response,
    { idFuncao, status, funcao, descricao }: UpdateFuncaoServiceProps,
  ) {
    try {
      const idFuncaoExists = await prismaClient.funcao.findFirst({
        where: {
          idFuncao: idFuncao,
        },
      });

      if (!idFuncaoExists) {
        returnError({
          messageConsole: "Função não encontrada",
          statusCode: 400,
          messageApi: "Função não encontrada",
          res,
        });
      }

      if (funcao === undefined || funcao === "") {
        funcao = idFuncaoExists?.funcao;
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
          funcao: funcao,
          descricao: descricao,
        },
        select: {
          idFuncao: true,
          status: true,
          funcao: true,
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
