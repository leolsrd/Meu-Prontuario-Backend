/*
  Warnings:

  - You are about to drop the column `idFuncao` on the `funcionarios` table. All the data in the column will be lost.
  - Added the required column `id_funcao` to the `funcionarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoAtendimento" AS ENUM ('PARTICULAR', 'CONVENIO');

-- CreateEnum
CREATE TYPE "TipoTitularidade" AS ENUM ('TITULAR', 'DEPENDENTE');

-- CreateEnum
CREATE TYPE "AbrangenciaPlano" AS ENUM ('NACIONAL', 'REGIONAL');

-- DropForeignKey
ALTER TABLE "funcionarios" DROP CONSTRAINT "funcionarios_idFuncao_fkey";

-- AlterTable
ALTER TABLE "funcionarios" DROP COLUMN "idFuncao",
ADD COLUMN     "id_funcao" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "pacientes" (
    "id_paciente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "data_nascimento" DATE,
    "sexo" TEXT,
    "cep" TEXT,
    "logradouro" TEXT,
    "complemento" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "tipo_atendimento" "TipoAtendimento" NOT NULL DEFAULT 'PARTICULAR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id_paciente")
);

-- CreateTable
CREATE TABLE "operadoras" (
    "id_operadora" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "registro_ans" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "operadoras_pkey" PRIMARY KEY ("id_operadora")
);

-- CreateTable
CREATE TABLE "planos_categorias" (
    "id_plano_categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_operadora" TEXT NOT NULL,

    CONSTRAINT "planos_categorias_pkey" PRIMARY KEY ("id_plano_categoria")
);

-- CreateTable
CREATE TABLE "paciente_planos_saude" (
    "id_paciente_plano_saude" TEXT NOT NULL,
    "idPaciente" TEXT NOT NULL,
    "id_plano_categoria" TEXT NOT NULL,
    "numero_carteirinha" TEXT NOT NULL,
    "validade" TIMESTAMP(3),
    "titularidade" "TipoTitularidade" NOT NULL DEFAULT 'TITULAR',
    "abrangencia" "AbrangenciaPlano" NOT NULL DEFAULT 'NACIONAL',
    "nome_titular" TEXT,
    "cpf_titular" TEXT,

    CONSTRAINT "paciente_planos_saude_pkey" PRIMARY KEY ("id_paciente_plano_saude")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_cnpj_key" ON "pacientes"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "operadoras_nome_key" ON "operadoras"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "operadoras_registro_ans_key" ON "operadoras"("registro_ans");

-- CreateIndex
CREATE UNIQUE INDEX "planos_categorias_nome_id_operadora_key" ON "planos_categorias"("nome", "id_operadora");

-- CreateIndex
CREATE UNIQUE INDEX "paciente_planos_saude_idPaciente_key" ON "paciente_planos_saude"("idPaciente");

-- CreateIndex
CREATE UNIQUE INDEX "paciente_planos_saude_numero_carteirinha_id_plano_categoria_key" ON "paciente_planos_saude"("numero_carteirinha", "id_plano_categoria");

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_id_funcao_fkey" FOREIGN KEY ("id_funcao") REFERENCES "funcoes"("id_funcao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planos_categorias" ADD CONSTRAINT "planos_categorias_id_operadora_fkey" FOREIGN KEY ("id_operadora") REFERENCES "operadoras"("id_operadora") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente_planos_saude" ADD CONSTRAINT "paciente_planos_saude_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "pacientes"("id_paciente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paciente_planos_saude" ADD CONSTRAINT "paciente_planos_saude_id_plano_categoria_fkey" FOREIGN KEY ("id_plano_categoria") REFERENCES "planos_categorias"("id_plano_categoria") ON DELETE CASCADE ON UPDATE CASCADE;
