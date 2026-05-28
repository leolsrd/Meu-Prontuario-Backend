import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { CreateFuncionarioServiceProps } from "../../@types/funcionario.types";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import {
  cepUndefinedSetZero,
  cpfCnpjUndefinedVaziaSetZero,
  telefoneUndefinedSetZero,
} from "../../utils/stringVaziaSetZero.utils";
import { returnError } from "../../utils/returnError";

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
    }: CreateFuncionarioServiceProps,
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
        cpfCnpj = cpfCnpjUndefinedVaziaSetZero(cpfCnpj!);
      }

      if (telefone) {
        telefone = removeMascaraDevolveNumero(telefone);
      }

      if (!telefone) {
        telefone = telefoneUndefinedSetZero(telefone!);
      }

      if (typeof status === "string") {
        status = checkBoooleanStringConvertInBoolean(status);
      }

      if (cep) {
        cep = removeMascaraDevolveNumero(cep);
      }

      if (!cep) {
        cep = cepUndefinedSetZero(cep!);
      }

      const cpfCnpjExists = await prismaClient.funcionario.findFirst({
        where: {
          cpfCnpj: cpfCnpj,
        },
      });

      if (cpfCnpjExists && cpfCnpjExists!.cpfCnpj !== "00000000000") {
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

      const funcionario = await prismaClient.funcionario.create({
        data,
      });

      return funcionario;
    } catch (error) {
      throw new Error("Falha ao criar funcionario", { cause: error });
    }
  }
}

export default CreateFuncionarioService;
