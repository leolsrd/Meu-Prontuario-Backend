import { config } from "dotenv";
import { resolve } from "path";
import "dotenv/config";
import { CreateFuncionarioServiceProps } from "../../@types/funcionario.types";
import { hash } from "bcryptjs";

config({
  path: resolve(process.cwd(), ".env"),
});

const senhaFuncionarioTeste = process.env.SENHA_FUNCIONARIO_TESTE as string;
const senhaFuncionarioAdmin = process.env.SENHA_FUNCIONARIO_ADMIN as string;

if (!senhaFuncionarioTeste || !senhaFuncionarioAdmin) {
  throw new Error("Senha de funcionario nao encontrada");
}

const insertFuncionarioAdmin: CreateFuncionarioServiceProps = {
  nome: "Admin",
  login: "Admin",
  // * Tem que pegar um idFuncao do banco de dados correspondente a função em questão
  idFuncao: "598c2e0a-6ed8-4918-946a-82d8aad4369e",
  status: true,
  cpfCnpj: null,
  senha: await hash(senhaFuncionarioAdmin!, 8),
  telefone: null,
  dataNascimento: new Date("1983-02-03"),
  cep: null,
  logradouro: null,
  complemento: "Casa",
  numero: 0,
  bairro: null,
  cidade: null,
  uf: null,
};

const insertFuncionarioTeste: CreateFuncionarioServiceProps = {
  nome: "Teste",
  login: "Teste",
  // * Tem que pegar um idFuncao do banco de dados correspondente a função em questão
  idFuncao: "e2135481-695b-4f82-97c0-ae0ec05fe1b0",
  status: true,
  cpfCnpj: null,
  senha: await hash(senhaFuncionarioTeste!, 8),
  telefone: null,
  dataNascimento: new Date("1983-02-03"),
  cep: null,
  logradouro: null,
  complemento: null,
  numero: 0,
  bairro: null,
  cidade: null,
  uf: null,
};

export { insertFuncionarioAdmin, insertFuncionarioTeste };
