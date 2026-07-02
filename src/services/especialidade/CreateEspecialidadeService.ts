import prismaClient from "../../prisma";
import { EspecialidadeServiceProps } from "../../@types/especialidade.types";
import { parseStatusCreate } from "../../utils/parseBoolean.utils";

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

    const status = parseStatusCreate(data.status);

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
