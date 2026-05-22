import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client';
import { insertFuncionarioAdmin, insertFuncionarioTeste } from "../src/data/funcionarios/insertFuncionarioDB";

// * Cria uma conexão com o banco de dados
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
  // * verificando se no banco de dados já tem as funções padrões
  const existeFuncionariosPadroes = await prisma.funcionario.findMany({
    where: {
      OR: [
        { nome: "Admin", funcao: { funcao: "ADMIN" } },
        { nome: "Teste", funcao: { funcao: "Teste" } },
      ],
    },
    include: {
      funcao: true,
    },
  });

  if(existeFuncionariosPadroes.length > 0) {
    console.log("Funcionários padrões já existem no banco de dados");
    console.log(existeFuncionariosPadroes.map(funcionario => funcionario));
    return;
  }

  console.log("Criando Funcionários padrões");

  // * Inserindo 3 funções na tabela funciona mas duplica não checa se já existe.
  await prisma.funcionario.createMany({
    data: [insertFuncionarioAdmin, insertFuncionarioTeste]
  })

  console.log("Criado com sucesso as 2 funcionários padrões: Admin, Teste");
}

main()
.catch((e) => {
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect()
})
