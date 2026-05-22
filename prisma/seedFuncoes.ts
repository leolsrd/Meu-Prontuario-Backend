import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client';

// * Cria uma conexão com o banco de dados
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const listFuncoesPadrao = [
  {funcao: "Admin", description: "Administrador com acesso total"},
  {funcao: "Teste", description: "Teste"},
  {funcao: "Medico", description: "Médico e este terá que cadastrar o CRM"},
  {funcao: "Atendente", description: "Atendente"},
]

async function main() {
  // * verificando se no banco de dados já tem as funções padrões
  const existsFuncoesPadrao = await prisma.funcao.findMany({
    where: {
      funcao: {
        in: ["ADMIN", "Medico", "Atendente", "Teste"]
      }
    }
  });

  if(existsFuncoesPadrao.length > 0) {
    console.log("Funções padrões já existem no banco de dados");
    console.log(existsFuncoesPadrao.map(funcao => funcao.funcao));
    return;
  }

  console.log("Criando funções padrões");
  // process.exit(1);

  // * Inserindo 3 funções na tabela funciona mas duplica não checa se já existe.
  await prisma.funcao.createMany({
    data: listFuncoesPadrao,
  })

  console.log("Criado com sucesso as 4 funções padrões: Admin, Teste, Medico, Atendente");
}

main()
.catch((e) => {
  console.error(e)
  process.exit(1)
})
.finally(async () => {
  await prisma.$disconnect()
})
