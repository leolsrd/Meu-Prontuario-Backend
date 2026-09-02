-- DropIndex
DROP INDEX "pacientes_cpf_cnpj_responsavel_key";

-- AlterTable
ALTER TABLE "pacientes" ADD COLUMN     "nome_responsavel" TEXT;
