import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { CreateFuncionarioServiceProps } from "../../@types/funcionario.types";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import checkBoooleanStringConvertInBoolean from "../../utils/checkBooleanString.utils";


class CreateFuncionarioService {
  async execute({
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
    uf
  }: CreateFuncionarioServiceProps) {

    const funcionarioExists = await prismaClient.funcionario.findFirst({
      where: {
        login: login
      }
    })

    if (funcionarioExists) {
      throw new Error("Funcionario ja cadastrado");
    }

    const senhaCheck = senha ?? await process.env.SENHA_FUNCIONARIO_TESTE;

    const senhaHash = await hash(senhaCheck!, 8);

    // * Removendo a máscara do CPF e do CNPJ
    if(cpfCnpj) {
      cpfCnpj = removeMascaraDevolveNumero(cpfCnpj)
    }

    if (!cpfCnpj) {
      cpfCnpj = "00000000000"
    }

    const cpfCnpjExists = await prismaClient.funcionario.findFirst({
      where: {
        cpfCnpj: cpfCnpj
      }
    })

    if (cpfCnpjExists && cpfCnpjExists.cpfCnpj !== "00000000000") {
      throw new Error("Cpf já cadastrado");
    }

    // * Removendo a máscara do telefone
    if (telefone) {
      telefone = removeMascaraDevolveNumero(telefone);
    }

    // * Verificando se o status veio String ou Boolean
    if (typeof status === "string") {
      status = checkBoooleanStringConvertInBoolean(status);
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
    // ^ Removi da validação
    // if (cpf) data.cpf = cpf;
    // if (telefone) data.telefone = telefone;
    if (dataNascimento) data.dataNascimento = new Date(dataNascimento);
    if (cep) data.cep = cep;
    if (logradouro) data.logradouro = logradouro;
    if (complemento) data.complemento = complemento;
    if (numero !== undefined) data.numero = numero;
    if (bairro) data.bairro = bairro;
    if (cidade) data.cidade = cidade;
    if (uf) data.uf = uf;

    // process.exit(1);

    const funcionario = await prismaClient.funcionario.create({
      data
    });

    return funcionario;
  }
}

export default CreateFuncionarioService;
