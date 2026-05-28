import { config } from 'dotenv'
import { resolve } from 'path'
import "dotenv/config";
import { CreateFuncionarioServiceProps } from "../../@types/funcionario.types";
import { hash } from "bcryptjs";

config({
  path: resolve(process.cwd(), ".env"),
})

const senhaFuncionarioTeste = process.env.SENHA_FUNCIONARIO_TESTE as string
const senhaFuncionarioAdmin = process.env.SENHA_FUNCIONARIO_ADMIN as string

if (!senhaFuncionarioTeste || !senhaFuncionarioAdmin) {
  throw new Error("Senha de funcionario nao encontrada");
}

const insertFuncionarioAdmin: CreateFuncionarioServiceProps = {
  "nome": "Admin",
  "login": "Admin",
  // * Tem que pegar um idFuncao do banco de dados correspondente a função em questão
  "idFuncao": "63f039de-4e76-4ada-9912-93a3b32604dd",
  "status": true,
  "cpfCnpj": "",
  "senha": await hash(senhaFuncionarioAdmin!, 8),
  "telefone": "",
  "dataNascimento": new Date("1983-02-03"),
  "cep": "",
  "logradouro": "",
  "complemento": "Casa",
  "numero": 0,
  "bairro": "",
  "cidade": "",
  "uf": ""
}


const insertFuncionarioTeste: CreateFuncionarioServiceProps = {
  "nome": "Teste",
  "login": "Teste",
  // * Tem que pegar um idFuncao do banco de dados correspondente a função em questão
  "idFuncao": "9492e138-da12-4c04-a299-bdf1a450d34f",
  "status": true,
  "cpfCnpj": "",
  "senha": await hash(senhaFuncionarioTeste!, 8),
  "telefone": "",
  "dataNascimento": new Date("1983-02-03"),
  "cep": "",
  "logradouro": "",
  "complemento": "Casa",
  "numero": 0,
  "bairro": "",
  "cidade": "",
  "uf": ""
}

export { insertFuncionarioAdmin, insertFuncionarioTeste };
