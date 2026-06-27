-- CreateTable
CREATE TABLE "funcoes" (
    "idFuncao" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funcoes_pkey" PRIMARY KEY ("idFuncao")
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "idFuncionario" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "nome" TEXT NOT NULL,
    "cpfCnpj" VARCHAR(14) DEFAULT '00000000000',
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "dataNascimento" DATE,
    "cep" TEXT,
    "logradouro" TEXT,
    "complemento" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idFuncao" TEXT NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("idFuncionario")
);

-- CreateTable
CREATE TABLE "medicos" (
    "idMedico" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "ufCRM" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idFuncionario" TEXT NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("idMedico")
);

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_idFuncao_fkey" FOREIGN KEY ("idFuncao") REFERENCES "funcoes"("idFuncao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_idFuncionario_fkey" FOREIGN KEY ("idFuncionario") REFERENCES "funcionarios"("idFuncionario") ON DELETE CASCADE ON UPDATE CASCADE;
