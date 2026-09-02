/*
  Warnings:

  - You are about to alter the column `cep` on the `funcionarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - You are about to alter the column `uf` on the `funcionarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `crm` on the `medicos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `uf_crm` on the `medicos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `rqe` on the `medicos_especialidades` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `cep` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - You are about to alter the column `uf` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - A unique constraint covering the columns `[cpf_cnpj_responsavel]` on the table `pacientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sexo` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- AlterTable
ALTER TABLE "funcionarios" ALTER COLUMN "cep" SET DATA TYPE VARCHAR(8),
ALTER COLUMN "uf" SET DATA TYPE VARCHAR(2);

-- AlterTable
ALTER TABLE "funcoes" ALTER COLUMN "nome" DROP DEFAULT;

-- AlterTable
ALTER TABLE "medicos" ALTER COLUMN "crm" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "uf_crm" SET DATA TYPE VARCHAR(2);

-- AlterTable
ALTER TABLE "medicos_especialidades" ALTER COLUMN "rqe" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "cpf_cnpj_responsavel" VARCHAR(14),
ALTER COLUMN "cpf_cnpj" DROP NOT NULL,
DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo" NOT NULL,
ALTER COLUMN "cep" SET DATA TYPE VARCHAR(8),
ALTER COLUMN "uf" SET DATA TYPE VARCHAR(2);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_cnpj_responsavel_key" ON "pacientes"("cpf_cnpj_responsavel");
