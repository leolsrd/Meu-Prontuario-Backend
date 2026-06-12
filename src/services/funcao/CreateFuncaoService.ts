import { Request, Response, NextFunction } from "express";
import { CreateFuncaoServiceProps } from "../../@types/funcao.types";
import prismaClient from "../../prisma";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { returnError } from "../../utils/returnError";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";

class CreateFuncaoService {
  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
    data: CreateFuncaoServiceProps,
  ) {
    try {
      const funcaoExists = await prismaClient.funcao.findFirst({
        where: {
          funcao: data.funcao,
        },
      });

      if (funcaoExists && funcaoExists?.status === false) {
        return returnError({
          messageConsole: "Função já cadastrada, mas está inativa",
          statusCode: 400,
          messageApi: "Função já cadastrada, mas está inativa",
          res,
        });
      }

      if (funcaoExists) {
        return returnError({
          messageConsole: "Função já cadastrada",
          statusCode: 400,
          messageApi: "Função já cadastrada",
          res,
        });
      }

      if (!data.status) {
        data.status = true;
      }

      if (data.descricao === "") {
        data.descricao = StringVaziaOrUndefinedSetNull(data.descricao);
      }

      if (typeof data.status === "string") {
        data.status = checkBoooleanStringConvertInBoolean(data.status);
      }

      const funcao = await prismaClient.funcao.create({
        data: {
          funcao: data.funcao,
          descricao: data.descricao,
          status: data.status,
        },
      });

      return funcao;
    } catch (error) {
      throw new Error("Falha ao criar funcao", { cause: error });
    }
  }
}

export { CreateFuncaoService };
