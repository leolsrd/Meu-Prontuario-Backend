import prismaClient from "../../prisma";
import { cleanAndRemoveMask } from "../../utils/cleanAndRemoveMask.utils";
import { formatAndValidateDateOfBirth } from "../../utils/formatAndValidateDateOfBirth.utils";
import { validateAndHashPassword } from "../../utils/validateAndHashPassword.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { MedicoServiceProps } from "../../@types/medico.types";
import { CreateMedicoService } from "../medico/CreateMedicoService";
import { parseStatusCreate } from "../../utils/parseBoolean.utils";

// Instancie fora da classe para evitar recriação na memória a cada execução
const createMedicoService = new CreateMedicoService();

class CreateFuncionarioService {
  async execute(data: MedicoServiceProps) {
    const login = data.login.trim();
    const nome = data.nome.trim();
    const idFuncao = data.idFuncao.trim();
    const status = parseStatusCreate(data.status);
    const crm = data.crm?.trim();
    const ufCRM = data.ufCRM?.trim();

    const cpfCnpj = cleanAndRemoveMask(data.cpfCnpj);
    const telefone = cleanAndRemoveMask(data.telefone);
    const cep = cleanAndRemoveMask(data.cep);

    // Operações assincronas pesadas que não dependem do banco de dados.
    const senhaHash = await validateAndHashPassword(data.senha);
    const dataNascimento = formatAndValidateDateOfBirth(data.dataNascimento);

    const dataValidated = {
      login,
      nome,
      idFuncao,
      status,
      cpfCnpj,
      senha: senhaHash,
      telefone,
      dataNascimento,
      cep,
      logradouro: StringVaziaOrUndefinedSetNull(data.logradouro?.trim()),
      complemento: StringVaziaOrUndefinedSetNull(data.complemento?.trim()),
      numero: data.numero || 0,
      bairro: StringVaziaOrUndefinedSetNull(data.bairro?.trim()),
      cidade: StringVaziaOrUndefinedSetNull(data.cidade?.trim()),
      uf: StringVaziaOrUndefinedSetNull(data.uf?.trim()),
    };

    // 3. Toda a lógica de banco envelopada com segurança na transação
    return await prismaClient.$transaction(async (tx) => {
      // Validação de Login Único (Segura contra concorrência)
      const funcionarioExists = await tx.funcionario.findFirst({
        where: { login },
      });
      if (funcionarioExists) {
        throw new Error("Funcionário já cadastrado no sistema com este login.");
      }

      // Validação de CPF/CNPJ Único
      if (cpfCnpj) {
        const cpfCnpjExists = await tx.funcionario.findFirst({
          where: { cpfCnpj },
        });
        if (cpfCnpjExists) {
          throw new Error("CPF/CNPJ já cadastrado no sistema");
        }
      }

      // Valida a função uma única vez
      const funcaoCadastrada = await tx.funcao.findFirst({
        where: { idFuncao },
      });
      if (!funcaoCadastrada) {
        throw new Error("Função não encontrada no sistema.");
      }

      // Fluxo específico caso a função seja "Medico"
      if (funcaoCadastrada.nome === "Medico") {
        if (!crm || !ufCRM) {
          throw new Error("Dados de médico faltando (CRM e UF/CRM)");
        }

        const dataValidatedMedico = {
          ...dataValidated,
          crm,
          ufCRM,
          especialidades: data.especialidades,
        };

        return await createMedicoService.execute(dataValidatedMedico, tx);
      }

      // Criação do funcionário padrão
      return await tx.funcionario.create({
        data: {
          status: dataValidated.status,
          nome: dataValidated.nome,
          cpfCnpj: dataValidated.cpfCnpj,
          login: dataValidated.login,
          senha: dataValidated.senha,
          telefone: dataValidated.telefone,
          dataNascimento: dataValidated.dataNascimento,
          cep: dataValidated.cep,
          logradouro: dataValidated.logradouro,
          complemento: dataValidated.complemento,
          numero: dataValidated.numero,
          bairro: dataValidated.bairro,
          cidade: dataValidated.cidade,
          uf: dataValidated.uf,
          idFuncao: dataValidated.idFuncao,
        },
        select: {
          idFuncionario: true,
          login: true,
          nome: true,
          status: true,
          cpfCnpj: true,
          telefone: true,
          dataNascimento: true,
          cep: true,
          logradouro: true,
          complemento: true,
          numero: true,
          bairro: true,
          cidade: true,
          uf: true,
          createdAt: true,
          updatedAt: true,
          funcao: {
            select: {
              idFuncao: true,
              nome: true,
            },
          },
        },
      });
    });
  }
}

export { CreateFuncionarioService };
