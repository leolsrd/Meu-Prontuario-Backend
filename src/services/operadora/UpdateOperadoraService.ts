import { Request, Response } from "express";
import prismaClient from "../../prisma";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { returnError } from "../../utils/returnError";

class UpdateOperadoraService {
  async execute(req: Request, res: Response, data: any) {
    try {
      const operadoraExists = await prismaClient.operadora.findFirst({
        where: {
          idOperadora: data.idOperadora,
        },
      });

      data.registroAns = data.registroAns?.toString();

      if (typeof data.status === "string") {
        data.status = checkBoooleanStringConvertInBoolean(data.status);
      }

      if (!operadoraExists) {
        return res.status(400).json({ error: "Operadora nao encontrada" });
      }

      const operadoraExistsByNome = await prismaClient.operadora.findFirst({
        where: {
          nome: data.nome,
          idOperadora: {
            not: data.idOperadora,
          },
        },
      });

      if (operadoraExistsByNome) {
        return returnError({
          messageConsole: "Operadora já cadastrada",
          statusCode: 400,
          messageApi: "Operadora já cadastrada",
          res,
        });
      }

      const operadoraExistsByRegistroAns =
        await prismaClient.operadora.findFirst({
          where: {
            registroAns: data.registroAns,
            idOperadora: {
              not: data.idOperadora,
            },
          },
        });

      if (operadoraExistsByRegistroAns) {
        return returnError({
          messageConsole: `Já existe uma operadora cadastrada com o mesmo registro ANS.
          Nome da operadora cadastrada: ${operadoraExistsByRegistroAns?.nome}`,
          statusCode: 400,
          messageApi: `Já existe uma operadora cadastrada com o mesmo registro ANS.
          Nome da operadora cadastrada: ${operadoraExistsByRegistroAns?.nome}`,
          res,
        });
      }

      const operadoraUpdate = await prismaClient.operadora.update({
        where: {
          idOperadora: data.idOperadora,
        },
        data: {
          ...data,
        },
      });

      return operadoraUpdate;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOperadoraService };
