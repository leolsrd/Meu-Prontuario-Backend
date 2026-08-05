import "dotenv/config";
import { config } from "dotenv";
import { resolve } from "path";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { hash } from "bcryptjs";

// Garante o carregamento das variáveis de ambiente
config({
  path: resolve(process.cwd(), ".env"),
});

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Definição das funções padrões
const listFuncoesPadrao = [
  { nome: "Admin", descricao: "Administrador com acesso total" },
  { nome: "Teste", descricao: "Teste" },
  { nome: "Medico", descricao: "Médico e este terá que cadastrar o CRM" },
];

async function main() {
  console.log("=== 🚀 Iniciando sincronização total do Banco de Dados ===");

  // 0. Validação das variáveis de ambiente necessárias para os funcionários
  const senhaFuncionarioTeste = process.env.SENHA_FUNCIONARIO_TESTE;
  const senhaFuncionarioAdmin = process.env.SENHA_FUNCIONARIO_ADMIN;

  if (!senhaFuncionarioTeste || !senhaFuncionarioAdmin) {
    throw new Error(
      "❌ Erro: Senhas dos funcionários (SENHA_FUNCIONARIO_TESTE / SENHA_FUNCIONARIO_ADMIN) não encontradas no .env",
    );
  }

  // 1. Sincronizar as Funções Padrões
  console.log("🌱 Sincronizando funções...");
  await Promise.all(
    listFuncoesPadrao.map((funcao) =>
      prisma.funcao.upsert({
        where: { nome: funcao.nome },
        update: { descricao: funcao.descricao },
        create: funcao,
      }),
    ),
  );
  console.log("✅ Funções sincronizadas com sucesso!");

  // Recarrega as funções do banco para obter os IDs gerados dinamicamente
  const funcoesDoBanco = await prisma.funcao.findMany();
  const funcaoAdminObj = funcoesDoBanco.find((f) => f.nome === "Admin");
  const funcaoTesteObj = funcoesDoBanco.find((f) => f.nome === "Teste");

  if (!funcaoAdminObj || !funcaoTesteObj) {
    throw new Error("❌ Erro ao recuperar os IDs das funções recém-criadas.");
  }

  // 2. Sincronizar as Especialidades Padrões
  console.log("🌱 Sincronizando especialidades...");
  const clinicoGeral = await prisma.especialidade.upsert({
    where: { nome: "Clínico Geral" },
    update: {},
    create: {
      nome: "Clínico Geral",
      status: true,
    },
  });
  console.log(
    `✅ Especialidade cadastrada ou já existente: ${clinicoGeral.nome}`,
  );

  // 3. Gerar Hashes das Senhas em Tempo de Execução
  console.log("🔒 Gerando credenciais seguras...");
  const senhaHashAdmin = await hash(senhaFuncionarioAdmin, 8);
  const senhaHashTeste = await hash(senhaFuncionarioTeste, 8);

  // 4. Sincronizar os Funcionários Padrões utilizando 'login' como chave única
  console.log("🌱 Sincronizando funcionários...");

  // Funcionário Admin
  await prisma.funcionario.upsert({
    where: { login: "Admin" }, // Requer campo 'login' como @unique no schema.prisma
    update: {
      nome: "Admin",
      idFuncao: funcaoAdminObj.idFuncao, // ID dinâmico vindo do banco
    },
    create: {
      nome: "Admin",
      login: "Admin",
      idFuncao: funcaoAdminObj.idFuncao, // ID dinâmico vindo do banco
      status: true,
      cpfCnpj: null,
      senha: senhaHashAdmin,
      telefone: null,
      dataNascimento: new Date("1983-02-03"),
      cep: null,
      logradouro: null,
      complemento: "Casa",
      numero: 0,
      bairro: null,
      cidade: null,
      uf: null,
    },
  });

  // Funcionário Teste
  await prisma.funcionario.upsert({
    where: { login: "Teste" }, // Requer campo 'login' como @unique no schema.prisma
    update: {
      nome: "Teste",
      idFuncao: funcaoTesteObj.idFuncao, // ID dinâmico vindo do banco
    },
    create: {
      nome: "Teste",
      login: "Teste",
      idFuncao: funcaoTesteObj.idFuncao, // ID dinâmico vindo do banco
      status: true,
      cpfCnpj: null,
      senha: senhaHashTeste,
      telefone: null,
      dataNascimento: new Date("1983-02-03"),
      cep: null,
      logradouro: null,
      complemento: null,
      numero: 0,
      bairro: null,
      cidade: null,
      uf: null,
    },
  });

  console.log("✅ Funcionários sincronizados com sucesso!");
  console.log("=== 🎉 Seed finalizado com sucesso absoluto ===");
}

main()
  .catch((e) => {
    console.error("❌ Erro crítico durante a execução do seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end(); // Evita que o terminal do Node fique travado/aberto
    await prisma.$disconnect();
  });
