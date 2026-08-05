/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_login_key" ON "funcionarios"("login");
