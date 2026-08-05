/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `funcoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "funcoes_nome_key" ON "funcoes"("nome");
