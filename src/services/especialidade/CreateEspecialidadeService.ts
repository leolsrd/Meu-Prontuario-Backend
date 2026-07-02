import prismaClient from "../../prisma";
import { EspecialidadeServiceProps } from "../../@types/especialidade.types";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";

class CreateEspecialidadeService {
  async execute(data: EspecialidadeServiceProps) {
    const nome = data.nome?.trim();

    if (!nome) {
      throw new Error("O nome da especialidade é obrigatório");
    }

    const especialidadeExists = await prismaClient.especialidade.findFirst({
      where: {
        nome,
      },
    });

    if (especialidadeExists && especialidadeExists?.status === false) {
      throw new Error("Especialidade já cadastrada, mas está inativa");
    }

    if (especialidadeExists) {
      throw new Error("Especialidade já cadastrada");
    }

    // const status =
    //   data.status === undefined
    //     ? true
    //     : typeof data.status === "string"
    //       ? (() => {
    //           const normalizedStatus = data.status.trim().toLowerCase();

    //           if (normalizedStatus === "true") return true;
    //           if (normalizedStatus === "false") return false;

    //           throw new Error("O campo status deve ser 'true' ou 'false'");
    //         })()
    //       : data.status;

    const status = checkBoooleanStringConvertInBoolean(data.status);

    const especialidade = await prismaClient.especialidade.create({
      data: {
        nome,
        status,
      },
    });

    return especialidade;
  }
}

export { CreateEspecialidadeService };
