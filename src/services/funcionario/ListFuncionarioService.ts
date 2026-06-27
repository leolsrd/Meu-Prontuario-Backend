import { Request, Response } from "express";
import prisma from "../../prisma";

class ListFuncionarioService {
  async execute() {
    try {
      const funcionario = await prisma.funcionario.findMany({
        select: {
          nome: true,
          login: true,
          funcao: {
            select: {
              nome: true,
            },
          },
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
        },
        orderBy: {
          nome: "asc",
        },
      });
      return funcionario;
    } catch (error) {
      throw new Error("Falha ao buscar os funcionários ", { cause: error });
    }
  }
}

export { ListFuncionarioService };
