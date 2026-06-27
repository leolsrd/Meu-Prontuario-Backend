import { Request, Response } from "express";
import prismaClient from "../../prisma";

class ListMedicoService {
  async listMedicoAll() {
    try {
      const medicos = await prismaClient.medico.findMany({
        select: {
          idMedico: true,
          idFuncionario: true,
          crm: true,
          ufCRM: true,
          especialidade: true,
          funcionario: {
            select: {
              idFuncionario: true,
              nome: true,
              login: true,
              cpfCnpj: true,
              telefone: true,
              dataNascimento: true,
              cep: true,
              logradouro: true,
              complemento: true,
              numero: true,
              bairro: true,
              cidade: true,
              uf: true,
              createdAt: true,
              updatedAt: true,
              funcao: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
        orderBy: {
          // nome: "asc",
          funcionario: {
            nome: "asc",
          },
        },
      });
      return medicos;
    } catch (error) {
      throw new Error("Falha ao buscar os medicos", { cause: error });
    }
  }

  async listMedicoStatus(req: Request, res: Response, status: boolean) {
    try {
      const medicos = await prismaClient.medico.findMany({
        where: {
          funcionario: {
            status: status,
          },
        },
        select: {
          idMedico: true,
          idFuncionario: true,
          crm: true,
          ufCRM: true,
          especialidade: true,
          funcionario: {
            select: {
              idFuncionario: true,
              nome: true,
              login: true,
              status: true,
              cpfCnpj: true,
              telefone: true,
              dataNascimento: true,
              cep: true,
              logradouro: true,
              complemento: true,
              numero: true,
              bairro: true,
              cidade: true,
              uf: true,
              createdAt: true,
              updatedAt: true,
              funcao: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
        orderBy: {
          funcionario: {
            nome: "asc",
          },
        },
      });
      return medicos;
    } catch (error) {
      throw new Error("Falha ao buscar os medicos", { cause: error });
    }
  }

  async listMedicoEspecialidade(
    req: Request,
    res: Response,
    especialidade: string,
  ) {
    try {
      const medicos = await prismaClient.medico.findMany({
        where: {
          especialidade: {
            contains: especialidade,
            mode: "insensitive",
          },
        },
        select: {
          idMedico: true,
          idFuncionario: true,
          crm: true,
          ufCRM: true,
          especialidade: true,
          funcionario: {
            select: {
              idFuncionario: true,
              nome: true,
              login: true,
              status: true,
              cpfCnpj: true,
              telefone: true,
              dataNascimento: true,
              cep: true,
              logradouro: true,
              complemento: true,
              numero: true,
              bairro: true,
              cidade: true,
              uf: true,
              createdAt: true,
              updatedAt: true,
              funcao: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
        orderBy: {
          funcionario: {
            nome: "asc",
          },
        },
      });
      return medicos;
    } catch (error) {
      throw new Error("Falha ao buscar os medicos", { cause: error });
    }
  }
}

export { ListMedicoService };
