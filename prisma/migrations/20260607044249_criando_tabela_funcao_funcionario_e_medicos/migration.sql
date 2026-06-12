/*
  Warnings:

  - The primary key for the `funcionarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cpfCnpj` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `idFuncionario` on the `funcionarios` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `funcionarios` table. All the data in the column will be lost.
  - The primary key for the `funcoes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `funcoes` table. All the data in the column will be lost.
  - You are about to drop the column `idFuncao` on the `funcoes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `funcoes` table. All the data in the column will be lost.
  - The primary key for the `medicos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the column `idMedico` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the column `ufCRM` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `medicos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf_cnpj]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.
  - The required column `id_funcionario` was added to the `funcionarios` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_funcao` was added to the `funcoes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_medico` was added to the `medicos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `uf_crm` to the `medicos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "funcionarios" DROP CONSTRAINT "funcionarios_idFuncao_fkey";

-- DropForeignKey
ALTER TABLE "medicos" DROP CONSTRAINT "medicos_idFuncionario_fkey";

-- AlterTable
ALTER TABLE "funcionarios" DROP CONSTRAINT "funcionarios_pkey",
DROP COLUMN "cpfCnpj",
DROP COLUMN "createdAt",
DROP COLUMN "dataNascimento",
DROP COLUMN "idFuncionario",
DROP COLUMN "updatedAt",
ADD COLUMN     "cpf_cnpj" VARCHAR(14),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_nascimento" DATE,
ADD COLUMN     "id_funcionario" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id_funcionario");

-- AlterTable
ALTER TABLE "funcoes" DROP CONSTRAINT "funcoes_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "idFuncao",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_funcao" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "funcoes_pkey" PRIMARY KEY ("id_funcao");

-- AlterTable
ALTER TABLE "medicos" DROP CONSTRAINT "medicos_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "idMedico",
DROP COLUMN "ufCRM",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_medico" TEXT NOT NULL,
ADD COLUMN     "uf_crm" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "medicos_pkey" PRIMARY KEY ("id_medico");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_cpf_cnpj_key" ON "funcionarios"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_idFuncao_fkey" FOREIGN KEY ("idFuncao") REFERENCES "funcoes"("id_funcao") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos" ADD CONSTRAINT "medicos_idFuncionario_fkey" FOREIGN KEY ("idFuncionario") REFERENCES "funcionarios"("id_funcionario") ON DELETE CASCADE ON UPDATE CASCADE;
