/*
  Warnings:

  - You are about to drop the column `description` on the `funcoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "funcoes" DROP COLUMN "description",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
