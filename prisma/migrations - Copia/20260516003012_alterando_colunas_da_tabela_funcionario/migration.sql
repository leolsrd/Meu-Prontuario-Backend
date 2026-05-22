/*
  Warnings:

  - You are about to alter the column `cpf` on the `funcionarios` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.

*/
-- AlterTable
ALTER TABLE "funcionarios" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(14),
ALTER COLUMN "dataNascimento" DROP NOT NULL;
