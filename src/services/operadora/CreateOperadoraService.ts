import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { returnError } from "../../utils/returnError";
import { OperadoraServiceProps } from "../../@types/operadora.types";
import { parseStatusCreate } from "../../utils/parseBoolean.utils";

class CreateOperadoraService {
  async execute(req: Request, res: Response, data: OperadoraServiceProps) {
    try {
      const operadoraExists = await prismaClient.operadora.findFirst({
        where: {
          nome: data.nome,
        },
      });

      if (operadoraExists && operadoraExists?.status === false) {
        return returnError({
          messageConsole: "Operadora ja cadastrada, mas esta inativa",
          statusCode: 400,
          messageApi: "Operadora ja cadastrada, mas esta inativa",
          res,
        });
      }

      if (operadoraExists) {
        return returnError({
          messageConsole: "Operadora ja cadastrada",
          statusCode: 400,
          messageApi: "Operadora ja cadastrada",
          res,
        });
      }

      data.registroAns = data.registroAns?.toString();

      const operadoraExistsByRegistroAns =
        await prismaClient.operadora.findFirst({
          where: {
            registroAns: data.registroAns,
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

      if (!data.status) data.status = true;

      if (typeof data.status === "string") {
        data.status = parseStatusCreate(data.status);
      }

      const operadora = await prismaClient.operadora.create({
        data: {
          nome: data.nome,
          registroAns: data.registroAns,
          status: data.status,
        },
      });

      return operadora;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateOperadoraService };
