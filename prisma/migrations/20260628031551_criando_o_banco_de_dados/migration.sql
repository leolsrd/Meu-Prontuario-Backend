/*
  Warnings:

  - You are about to drop the column `especialidade` on the `medicos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crm,uf_crm]` on the table `medicos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "medicos" DROP COLUMN "especialidade",
ADD COLUMN     "rqe" TEXT;

-- CreateTable
CREATE TABLE "especialidades" (
    "id_especialidade" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id_especialidade")
);

-- CreateTable
CREATE TABLE "_EspecialidadeToMedico" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EspecialidadeToMedico_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_nome_key" ON "especialidades"("nome");

-- CreateIndex
CREATE INDEX "_EspecialidadeToMedico_B_index" ON "_EspecialidadeToMedico"("B");

-- CreateIndex
CREATE UNIQUE INDEX "medicos_crm_uf_crm_key" ON "medicos"("crm", "uf_crm");

-- AddForeignKey
ALTER TABLE "_EspecialidadeToMedico" ADD CONSTRAINT "_EspecialidadeToMedico_A_fkey" FOREIGN KEY ("A") REFERENCES "especialidades"("id_especialidade") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EspecialidadeToMedico" ADD CONSTRAINT "_EspecialidadeToMedico_B_fkey" FOREIGN KEY ("B") REFERENCES "medicos"("id_medico") ON DELETE CASCADE ON UPDATE CASCADE;
