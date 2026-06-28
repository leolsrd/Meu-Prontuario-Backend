import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { EspecialidadeServiceProps } from "../../@types/especialidade.types";
import { returnError } from "../../utils/returnError";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";

class CreateEspecialidadeService {
  async execute(req: Request, res: Response, data: EspecialidadeServiceProps) {
    try {
      const nome = data.nome?.trim();

      if (!nome) {
        return returnError({
          messageConsole: "O nome da especialidade é obrigatório",
          statusCode: 400,
          messageApi: "O nome da especialidade é obrigatório",
          res,
        });
      }

      const especialidadeExists = await prismaClient.especialidade.findFirst({
        where: {
          nome,
        },
      });

      if (especialidadeExists && especialidadeExists?.status === false) {
        return returnError({
          messageConsole: "Especialidade já cadastrada, mas está inativa",
          statusCode: 400,
          messageApi: "Especialidade já cadastrada, mas está inativa",
          res,
        });
      }

      if (especialidadeExists) {
        return returnError({
          messageConsole: "Especialidade já cadastrada",
          statusCode: 400,
          messageApi: "Especialidade já cadastrada",
          res,
        });
      }

      if (data.status === undefined) {
        data.status = true;
      }

      if (typeof data.status === "string") {
        data.status = checkBoooleanStringConvertInBoolean(data.status);
      }

      const especialidade = await prismaClient.especialidade.create({
        data: {
          nome,
          status: data.status,
        },
      });

      return especialidade;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateEspecialidadeService };
