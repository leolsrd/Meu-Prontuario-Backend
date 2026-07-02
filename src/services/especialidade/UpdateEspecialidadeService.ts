import prismaClient from "../../prisma";
import { EspecialidadeServiceProps } from "../../@types/especialidade.types";
import { parseStatusUpdate } from "../../utils/parseBoolean.utils";

class UpdateEspecialidadeService {
  async execute(data: EspecialidadeServiceProps) {
    const nome = data.nome?.trim();

    if (!data.idEspecialidade) {
      throw new Error("O id da especialidade é obrigatório");
    }

    if (!nome) {
      throw new Error("O nome da especialidade é obrigatório");
    }

    const especialidadeExists = await prismaClient.especialidade.findUnique({
      where: {
        idEspecialidade: data.idEspecialidade,
      },
    });

    if (!especialidadeExists) {
      throw new Error("Especialidade não encontrada");
    }

    const especialidadeWithSameName =
      await prismaClient.especialidade.findFirst({
        where: {
          nome,
          idEspecialidade: {
            not: data.idEspecialidade,
          },
        },
      });

    if (
      especialidadeWithSameName &&
      especialidadeWithSameName?.status === false
    ) {
      throw new Error("Especialidade já cadastrada, mas está inativa");
    }

    if (especialidadeWithSameName) {
      throw new Error("Especialidade já cadastrada");
    }

    const status = parseStatusUpdate(data.status);

    try {
      const especialidade = await prismaClient.especialidade.update({
        where: {
          idEspecialidade: data.idEspecialidade,
        },
        data: {
          nome,
          status,
        },
      });

      return especialidade;
    } catch (error) {
      throw new Error("Falha ao atualizar a especialidade", { cause: error });
    }
  }
}

export { UpdateEspecialidadeService };
