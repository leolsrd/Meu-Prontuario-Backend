/*
  Warnings:

  - A unique constraint covering the columns `[idFuncionario]` on the table `medicos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medicos_idFuncionario_key" ON "medicos"("idFuncionario");
