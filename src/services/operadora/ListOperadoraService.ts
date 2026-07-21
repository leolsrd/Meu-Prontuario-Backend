import prismaClient from "../../prisma";
import { parseStatusUpdate } from "../../utils/parseBoolean.utils";

class ListOperadoraService {
  async listOperadoraStatus(status: boolean) {
    const statusValid = parseStatusUpdate(status);

    const operadoras = await prismaClient.operadora.findMany({
      where: {
        status: statusValid,
      },
      select: {
        idOperadora: true,
        nome: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    return operadoras;
  }

  async listOperadoraAll() {
    const operadoras = await prismaClient.operadora.findMany({
      select: {
        idOperadora: true,
        nome: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    return operadoras;
  }
}

export { ListOperadoraService };
