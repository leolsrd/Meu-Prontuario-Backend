import prismaClient from "../../prisma";

class ListEspecialidadeService {
  async getAll() {
    const especialidades = await prismaClient.especialidade.findMany();

    if (!especialidades) throw new Error("Nenhuma especialidade encontrada");

    return especialidades;
  }

  async getEspecialidadeStatus(status: boolean) {
    const especialidades = await prismaClient.especialidade.findMany({
      where: {
        status,
      },
    });

    if (!especialidades) throw new Error("Nenhuma especialidade encontrada");

    return especialidades;
  }
}

export default ListEspecialidadeService;
