import { Request, Response } from "express";
import { MedicoServiceProps } from "../../@types/medico.types";
import prismaClient from "../../prisma";
import { returnError } from "../../utils/returnError";
import { hash } from "bcryptjs";

class CreateMedicoService {
  async execute(
    req: Request,
    res: Response,
    data: MedicoServiceProps,
    // idFuncionario: string,
    tx = prismaClient,
  ) {
    try {
      const crmExist = await prismaClient.medico.findFirst({
        where: {
          crm: data.crm,
        },
      });

      if (crmExist) {
        return returnError({
          messageConsole: "Já existe um médico cadastrado com este CRM",
          statusCode: 400,
          messageApi: "Já existe um médico cadastrado com este CRM",
          res,
        });
      }

      const senhaCheck =
        data.senha ?? (await process.env.SENHA_FUNCIONARIO_TESTE);

      const senhaHash = await hash(senhaCheck!, 8);

      // console.log("Chegou no service médico");
      // console.log(dataMedico);
      // console.log(idFuncionario);
      // process.exit(1);

      const medico = await tx.medico.create({
        data: {
          crm: data.crm,
          especialidade: data.especialidade,
          ufCRM: data.ufCRM,
          funcionario: {
            create: {
              login: data.login,
              nome: data.nome,
              idFuncao: data.idFuncao,
              status: data.status,
              cpfCnpj: data.cpfCnpj,
              senha: senhaHash,
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

export { CreateMedicoService };
