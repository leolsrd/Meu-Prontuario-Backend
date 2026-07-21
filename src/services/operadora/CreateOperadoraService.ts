import { OperadoraServiceProps } from "../../@types/operadora.types";
import prismaClient from "../../prisma";
import { parseStatusCreate } from "../../utils/parseBoolean.utils";

class CreateOperadoraService {
  async execute(data: OperadoraServiceProps) {
    const nome = data.nome?.trim();
    const registroAns = data.registroAns?.toString().trim();

    if (!nome) {
      throw new Error("O nome da operadora é obrigatório");
    }

    if (!registroAns) {
      throw new Error("O registro ANS é obrigatório");
    }

    const operadoraExists = await prismaClient.operadora.findFirst({
      where: {
        nome,
      },
    });

    if (operadoraExists && operadoraExists?.status === false) {
      throw new Error("Operadora já cadastrada, mas está inativa");
    }

    if (operadoraExists) {
      throw new Error("Operadora já cadastrada");
    }

    const operadoraExistsByRegistroAns = await prismaClient.operadora.findFirst(
      {
        where: {
          registroAns,
        },
      },
    );

    if (operadoraExistsByRegistroAns) {
      throw new Error(
        `Já existe uma operadora cadastrada com o mesmo registro ANS. Nome da operadora cadastrada: ${operadoraExistsByRegistroAns?.nome}`,
      );
    }

    const status = parseStatusCreate(data.status);

    const operadora = await prismaClient.operadora.create({
      data: {
        nome,
        registroAns,
        status,
      },
    });

    return operadora;
  }
}

export { CreateOperadoraService };
