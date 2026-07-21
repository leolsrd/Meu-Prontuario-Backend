import { OperadoraServiceProps } from "../../@types/operadora.types";
import prismaClient from "../../prisma";
import { parseStatusUpdate } from "../../utils/parseBoolean.utils";

class UpdateOperadoraService {
  async execute(data: OperadoraServiceProps) {
    const nome = data.nome?.trim();
    const registroAns = data.registroAns?.toString().trim();
    const status = parseStatusUpdate(data.status);

    if (!data.idOperadora) {
      throw new Error("O id da operadora é obrigatório");
    }

    if (data.nome !== undefined && nome === "") {
      throw new Error("O nome da operadora é obrigatório");
    }

    if (registroAns !== undefined && registroAns === "") {
      throw new Error("O registro ANS é obrigatório");
    }

    const idOperadoraExists = await prismaClient.operadora.findFirst({
      where: {
        idOperadora: data.idOperadora,
      },
    });

    if (!idOperadoraExists) {
      throw new Error("Operadora não encontrada");
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
      throw new Error("Operadora já cadastrada");
    }

    const operadoraExistsByRegistroAns = await prismaClient.operadora.findFirst(
      {
        where: {
          registroAns: registroAns,
          idOperadora: {
            not: data.idOperadora,
          },
        },
      },
    );

    if (operadoraExistsByRegistroAns) {
      throw new Error(`Já existe uma operadora cadastrada com o mesmo registro ANS.
          Nome da operadora cadastrada: ${operadoraExistsByRegistroAns?.nome}`);
    }

    const operadoraUpdate = await prismaClient.operadora.update({
      where: {
        idOperadora: data.idOperadora,
      },
      data: {
        nome: nome,
        registroAns: registroAns,
        status: status,
      },
    });

    return operadoraUpdate;
  }
}

export { UpdateOperadoraService };
