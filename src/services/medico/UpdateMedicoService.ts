import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { UpdateMedicoServiceProps } from "../../@types/medico.types";
import { returnError } from "../../utils/returnError";
import { hash } from "bcryptjs";

class UpdateMedicoService {
  async execute(
    req: Request,
    res: Response,
    data: UpdateMedicoServiceProps,
    tx = prismaClient,
  ) {
    try {
      const crmExist = await prismaClient.medico.findFirst({
        where: {
          crm: data.crm,
        },
      });

      if (crmExist && crmExist.idFuncionario !== data.idFuncionario) {
        return returnError({
          messageConsole: "Já existe um médico cadastrado com este CRM",
          statusCode: 400,
          messageApi: "Já existe um médico cadastrado com este CRM",
          res,
        });
      }

      const idFuncionarioMedico = await prismaClient.medico.findFirst({
        where: {
          idFuncionario: data.idFuncionario,
        },
      });

      const funcionarioWithSameLogin = await prismaClient.funcionario.findFirst(
        {
          where: {
            login: data.login,
            idFuncionario: {
              not: data.idFuncionario,
            },
          },
        },
      );

      if (funcionarioWithSameLogin) {
        return returnError({
          messageConsole: "Já existe um funcionário cadastrado com este login",
          statusCode: 400,
          messageApi: "Já existe um funcionário cadastrado com este login",
          res,
        });
      }

      const medico = await tx.medico.update({
        where: {
          // ^ Vai depender do select acima se vai dar certo ou não.
          idMedico: idFuncionarioMedico?.idMedico,
        },
        data: {
          crm: data.crm,
          especialidade: data.especialidade,
          ufCRM: data.ufCRM,
          funcionario: {
            update: {
              login: data.login,
              nome: data.nome,
              idFuncao: data.idFuncao,
              status: data.status,
              cpfCnpj: data.cpfCnpj,
              senha: data.senha
                ? await hash(data.senha, 8)
                : process.env.SENHA_FUNCIONARIO_TESTE,
              telefone: data.telefone,
              dataNascimento: data.dataNascimento,
              cep: data.cep,
              logradouro: data.logradouro,
              complemento: data.complemento,
              numero: data.numero,
              bairro: data.bairro,
              cidade: data.cidade,
              uf: data.uf,
            },
          },
        },
        select: {
          crm: true,
          especialidade: true,
          ufCRM: true,
          funcionario: {
            select: {
              login: true,
              nome: true,
              idFuncao: true,
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
            },
          },
        },
      });

      return medico;
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateMedicoService };
