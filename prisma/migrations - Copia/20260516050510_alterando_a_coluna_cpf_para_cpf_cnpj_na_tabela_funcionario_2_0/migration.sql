/*
  Warnings:

  - You are about to drop the column `cpf` on the `funcionarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "funcionarios" DROP COLUMN "cpf",
ADD COLUMN     "cpfCnpj" VARCHAR(14) DEFAULT '00000000000';
