import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { Request, Response } from "express";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { returnError } from "../../utils/returnError";
import { UpdateMedicoServiceProps } from "../../@types/medico.types";
import { UpdateMedicoService } from "../medico/UpdateMedicoService";

class UpdateFuncionarioService {
  async execute(res: Response, req: Request, data: UpdateMedicoServiceProps) {
    try {
      const idFuncaoExists = await prismaClient.funcao.findFirst({
        where: {
          idFuncao: data.idFuncao,
        },
      });

      if (!idFuncaoExists) {
        return returnError({
          messageConsole: "Função do funcionário não encontrada",
          statusCode: 400,
          messageApi: "Função do funcionário não encontrada",
          res,
        });
      }

      const idFuncionarioExists = await prismaClient.funcionario.findFirst({
        where: {
          idFuncionario: data.idFuncionario,
        },
      });

      if (!idFuncionarioExists) {
        return returnError({
          messageConsole: "Funcionário nãoo encontrado",
          statusCode: 400,
          messageApi: "Funcionário não encontrado",
          res,
        });
      }

      if (typeof data.status === "string") {
        data.status = checkBoooleanStringConvertInBoolean(data.status);
      }

      if (data.telefone) {
        data.telefone = removeMascaraDevolveNumero(data.telefone);
      }

      if (data.telefone === "") {
        data.telefone = StringVaziaOrUndefinedSetNull(data.telefone);
      }

      if (data.cep === "" || data.cep === undefined) {
        data.cep = StringVaziaOrUndefinedSetNull(data.cep!);
      }

      if (data.cep) {
        data.cep = removeMascaraDevolveNumero(data.cep);
      }

      if (data.cpfCnpj) {
        data.cpfCnpj = removeMascaraDevolveNumero(data.cpfCnpj);
      }

      if (data.cpfCnpj === "" || data.cpfCnpj === undefined) {
        data.cpfCnpj = StringVaziaOrUndefinedSetNull(data.cpfCnpj!);
      }

      const cpfCnpjExists = data.cpfCnpj
        ? await prismaClient.funcionario.findFirst({
            where: {
              AND: [
                { cpfCnpj: data.cpfCnpj },
                { cpfCnpj: { not: null } },
                { idFuncionario: { not: data.idFuncionario } },
              ],
            },
          })
        : null;

      if (cpfCnpjExists && data.cpfCnpj) {
        return returnError({
          messageConsole: "CPF/CNPJ já cadastrado no sistema",
          statusCode: 400,
          messageApi: "CPF/CNPJ já cadastrado no sistema",
          res,
        });
      }

      const loginExists = data.login
        ? await prismaClient.funcionario.findFirst({
            where: {
              login: data.login,
              idFuncionario: { not: data.idFuncionario },
            },
          })
        : null;

      if (loginExists && data.login) {
        return returnError({
          messageConsole: "Login já cadastrado no sistema",
          statusCode: 400,
          messageApi: "Login já cadastrado no sistema",
          res,
        });
      }

      const result = await prismaClient.$transaction(async (tx) => {
        // * Validação para médicos
        const getFuncaoMedico = await prismaClient.funcao.findFirst({
          where: {
            idFuncao: data.idFuncao,
          },
        });

        if (getFuncaoMedico?.nome === "Medico") {
          if (data.crm && data.especialidade && data.ufCRM) {
            const medicoCriado = await new UpdateMedicoService().execute(
              req,
              res,
              data,
              (tx = prismaClient),
            );

            return medicoCriado;
          } else {
            return returnError({
              messageConsole:
                "Dados de médico faltando (CRM, especialidade e UF/CRM)",
              statusCode: 400,
              messageApi:
                "Dados de médico faltando (CRM, especialidade e UF/CRM)",
              res,
            });
          }
        } else {
          const funcionarioCriado = await tx.funcionario.update({
            where: {
              idFuncionario: data.idFuncionario,
            },
            data: {
              status: data.status,
              nome: data.nome,
              cpfCnpj: data.cpfCnpj,
              login: data.login,
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
              idFuncao: data.idFuncao,
            },
          });

          return funcionarioCriado;
        }
      });

      return result;
    } catch (error) {
      throw new Error("Falha ao atualizar os dados do funcionário", {
        cause: error,
      });
    }
  }
}

export { UpdateFuncionarioService };
