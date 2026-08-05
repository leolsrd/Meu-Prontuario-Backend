/*
  Warnings:

  - You are about to drop the column `rqe` on the `medicos` table. All the data in the column will be lost.
  - You are about to drop the `_EspecialidadeToMedico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `especialidades` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EspecialidadeToMedico" DROP CONSTRAINT "_EspecialidadeToMedico_A_fkey";

-- DropForeignKey
ALTER TABLE "_EspecialidadeToMedico" DROP CONSTRAINT "_EspecialidadeToMedico_B_fkey";

-- AlterTable
ALTER TABLE "especialidades" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "medicos" DROP COLUMN "rqe";

-- DropTable
DROP TABLE "_EspecialidadeToMedico";

-- CreateTable
CREATE TABLE "medicos_especialidades" (
    "id_medico" TEXT NOT NULL,
    "id_especialidade" TEXT NOT NULL,
    "rqe" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicos_especialidades_pkey" PRIMARY KEY ("id_medico","id_especialidade")
);

-- AddForeignKey
ALTER TABLE "medicos_especialidades" ADD CONSTRAINT "medicos_especialidades_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "medicos"("id_medico") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicos_especialidades" ADD CONSTRAINT "medicos_especialidades_id_especialidade_fkey" FOREIGN KEY ("id_especialidade") REFERENCES "especialidades"("id_especialidade") ON DELETE CASCADE ON UPDATE CASCADE;
