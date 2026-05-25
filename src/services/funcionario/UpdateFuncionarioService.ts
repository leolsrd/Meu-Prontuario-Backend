import {hash } from "bcryptjs";
import prismaClient from "../../prisma";
import { UpdateFuncionarioServiceProps } from "../../@types/funcionario.types";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";
import { cepStringVaziaSetZero, cpfCnpjStringVaziaSetZero, telefoneStringVaziaSetZero} from "../../utils/stringVaziaSetZero.utils";


class UpdateFuncionarioService {
  async execute({
    idFuncionario,
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
    uf }: UpdateFuncionarioServiceProps) {

    try {

      const idFuncaoExists = await prismaClient.funcao.findFirst({
        where: {
          idFuncao: idFuncao
        }
      })

        if(!idFuncaoExists) {
          throw new Error("Funcao nao encontrada");
      }

      const idFuncionarioExists = await prismaClient.funcionario.findFirst({
        where: {
          idFuncionario: idFuncionario
        }
      })

      if(!idFuncionarioExists) {
        throw new Error("Funcionario nao encontrado");
      }

      if (typeof status === "string") {
        status = checkBoooleanStringConvertInBoolean(status);
      }

      if (telefone) {
        telefone = removeMascaraDevolveNumero(telefone);
      }

      if(telefone === "") {
        telefone = telefoneStringVaziaSetZero(telefone);
      }

      if (cep === "") {
        cep = cepStringVaziaSetZero(cep);
      }

      if (cep) {
        cep = removeMascaraDevolveNumero(cep);
      }

      if (cpfCnpj) {
        cpfCnpj = removeMascaraDevolveNumero(cpfCnpj);
      }

      if(cpfCnpj === "") {
        cpfCnpj = cpfCnpjStringVaziaSetZero(cpfCnpj);
      }

      const funcionario = await prismaClient.funcionario.update({
        where: {
          idFuncionario: idFuncionario
        },
        data: {
          login: login,
          nome: nome,
          idFuncao: idFuncao,
          status: status,
          cpfCnpj: cpfCnpj,
          senha: senha ? await hash(senha, 8) : process.env.SENHA_FUNCIONARIO_TESTE,
          telefone: telefone,
          dataNascimento: dataNascimento,
          cep: cep,
          logradouro: logradouro,
          complemento: complemento,
          numero: numero,
          bairro: bairro,
          cidade: cidade,
          uf: uf
        }
      });

      return funcionario;

    } catch (error) {
      console.log(error);
      throw new Error("Falha ao atualizar os dados do funcionário", { cause: error });
    }
  }
}

export { UpdateFuncionarioService };
