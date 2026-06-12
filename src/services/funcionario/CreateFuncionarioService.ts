import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { returnError } from "../../utils/returnError";
import { MedicoServiceProps } from "../../@types/medico.types";
import { CreateMedicoService } from "../medico/CreateMedicoService";

class CreateFuncionarioService {
  async execute(
    req: Request,
    res: Response,
    {
      login,
      nome,
      idFuncao,
      status,
      cpfCnpj,
      senha,
      telefone,
      dataNascimento,
      cep,
      logradouro,
      complemento,
      numero,
      bairro,
      cidade,
      uf,
      crm,
      especialidade,
      ufCRM,
    }: MedicoServiceProps,
  ) {
    try {
      const funcionarioExists = await prismaClient.funcionario.findFirst({
        where: {
          login: login,
        },
      });

      if (funcionarioExists) {
        return returnError({
          messageConsole: "Funcionário já cadastrado no sistema",
          statusCode: 400,
          messageApi: "Funcionário já cadastrado no sistema",
          res,
        });
      }

      const senhaCheck = senha ?? (await process.env.SENHA_FUNCIONARIO_TESTE);

      const senhaHash = await hash(senhaCheck!, 8);

      if (cpfCnpj) {
        cpfCnpj = removeMascaraDevolveNumero(cpfCnpj);
      }

      if (!cpfCnpj) {
        cpfCnpj = StringVaziaOrUndefinedSetNull(cpfCnpj!);
      }

      if (telefone) {
        telefone = removeMascaraDevolveNumero(telefone);
      }

      if (!telefone) {
        telefone = StringVaziaOrUndefinedSetNull(telefone!);
      }

      if (typeof status === "string") {
        status = checkBoooleanStringConvertInBoolean(status);
      }

      if (cep) {
        cep = removeMascaraDevolveNumero(cep);
      }

      if (!cep) {
        cep = StringVaziaOrUndefinedSetNull(cep!);
      }

      const cpfCnpjExists = await prismaClient.funcionario.findFirst({
        where: {
          cpfCnpj: cpfCnpj,
        },
      });

      if (cpfCnpjExists && cpfCnpjExists!.cpfCnpj !== null) {
        return returnError({
          messageConsole: "CPF/CNPJ já cadastrado no sistema",
          statusCode: 400,
          messageApi: "CPF/CNPJ já cadastrado no sistema",
          res,
        });
      }

      const data: any = {
        login,
        nome,
        idFuncao: idFuncao,
        senha: senhaHash,
        cpfCnpj: cpfCnpj,
        telefone: telefone,
        status: status,
      };

      if (status !== undefined) data.status = status;
      if (dataNascimento) data.dataNascimento = new Date(dataNascimento);
      if (cep) data.cep = cep;
      if (logradouro) data.logradouro = logradouro;
      if (complemento) data.complemento = complemento;
      if (numero !== undefined) data.numero = numero;
      if (bairro) data.bairro = bairro;
      if (cidade) data.cidade = cidade;
      if (uf) data.uf = uf;
      if (crm) data.crm = crm;
      if (especialidade) data.especialidade = especialidade;
      if (ufCRM) data.ufCRM = ufCRM;

      const result = await prismaClient.$transaction(async (tx) => {
        const getFuncaoMedico = await prismaClient.funcao.findFirst({
          where: {
            idFuncao: idFuncao,
          },
        });

        // * Validação para cadastrar médicos
        if (getFuncaoMedico?.funcao === "Medico") {
          if (data.crm && data.especialidade && data.ufCRM) {
            console.log("Entrou no if do médico");
            const medicoCriado = await new CreateMedicoService().execute(
              req,
              res,
              data,
              (tx = prismaClient),
            );

            return medicoCriado;
          } else {
            return returnError({
              messageConsole:
                "Dados de médico faltando (CRM, especialidade ou UF/CRM)",
              statusCode: 400,
              messageApi:
                "Dados de médico faltando (CRM, especialidade ou UF/CRM)",
              res,
            });
          }
        } else {
          // * Cadastrar funcionário não médico.
          const funcionarioCriado = await tx.funcionario.create({
            data: {
              status: data.status,
              nome: data.nome,
              cpfCnpj: data.cpfCnpj,
              login: data.login,
              senha: data.senha,
              telefone: data.telefone,
              dataNascimento: data.dataNascimento,
              cep: data.cep,
              logradouro: data.logradouro,
              complemento: data.complemento,
              numero: data.numero,
              bairro: data.bairro,
              cidade: data.cidade,
              uf: data.uf,
              idFuncao: data.idFuncao,
            },
          });

          return funcionarioCriado;
        }
      });

      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Falha ao criar funcionario", { cause: error });
    }
  }
}

export { CreateFuncionarioService };
