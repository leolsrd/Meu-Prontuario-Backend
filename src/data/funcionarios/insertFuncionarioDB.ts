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
  idFuncao: "4d792f88-3132-4ed7-ba35-b323d1deb875",
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
  idFuncao: "49a58ece-d71f-486c-9691-a01174f9f1b1",
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
