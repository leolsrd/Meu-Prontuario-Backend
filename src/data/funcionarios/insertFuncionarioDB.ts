import { config } from 'dotenv'
import { resolve } from 'path'
import "dotenv/config";
import { CreateFuncionarioServiceProps } from "../../@types/funcionario.types";
import { hash } from "bcryptjs";

config({
  path: resolve(process.cwd(), ".env"),
})

const senhaFuncionarioTeste = process.env.SENHA_FUNCIONARIO_TESTE
const senhaFuncionarioAdmin = process.env.SENHA_FUNCIONARIO_ADMIN

if (!senhaFuncionarioTeste || !senhaFuncionarioAdmin) {
  throw new Error("Senha de funcionario nao encontrada");
}

const insertFuncionarioAdmin: CreateFuncionarioServiceProps = {
  "nome": "Admin",
  "login": "Admin",
  // * Tem que pegar um idFuncao do banco de dados correspondente a função em questão
  "idFuncao": "00274892-d6a4-4ce8-9411-fb94675c65d0",
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
  "idFuncao": "e6ebeb68-1b2f-4254-ad50-33af54fe264b",
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
