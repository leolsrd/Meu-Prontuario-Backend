-- CreateTable
CREATE TABLE "funcoes" (
    "idFuncao" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "funcoes_pkey" PRIMARY KEY ("idFuncao")
);
