import prismaClient from "../../prisma";
import { cleanAndRemoveMask } from "../../utils/cleanAndRemoveMask.utils";
import { formatAndValidateDateOfBirth } from "../../utils/formatAndValidateDateOfBirth.utils";
import { validateAndHashPassword } from "../../utils/validateAndHashPassword.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { MedicoServiceProps } from "../../@types/medico.types";
import { CreateMedicoService } from "../medico/CreateMedicoService";
import { parseStatusCreate } from "../../utils/parseBoolean.utils";

interface ValidatedFuncionarioData {
  login: string;
  nome: string;
  idFuncao: string;
  status: boolean;
  cpfCnpj: string | null;
  senha: string;
  telefone: string | null;
  dataNascimento: string | null | Date;
  cep: string | null;
  logradouro: string | null;
  complemento: string | null;
  numero: number;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
}

class CreateFuncionarioService {
  async execute(data: MedicoServiceProps) {
    const login = data.login.trim();
    const nome = data.nome.trim();
    const idFuncao = data.idFuncao.trim();
    const status = parseStatusCreate(data.status);
    const senhaHash = await validateAndHashPassword(data.senha);
    const dataNascimento = formatAndValidateDateOfBirth(data.dataNascimento);
    const crm = data.crm?.trim();
    const ufCRM = data.ufCRM?.trim();
    const especialidade = data.especialidade?.trim();

    const funcionarioExists = await prismaClient.funcionario.findFirst({
      where: { login },
    });

    if (funcionarioExists) {
      throw new Error("Funcionário já cadastrado no sistema com este login.");
    }

    const funcaoExists = await prismaClient.funcao.findFirst({
      where: { idFuncao },
    });

    if (!funcaoExists) {
      throw new Error("Função não encontrada no sistema.");
    }

    const cpfCnpj = cleanAndRemoveMask(data.cpfCnpj);
    const telefone = cleanAndRemoveMask(data.telefone);
    const cep = cleanAndRemoveMask(data.cep);

    if (cpfCnpj) {
      const cpfCnpjExists = await prismaClient.funcionario.findFirst({
        where: { cpfCnpj },
      });

      if (cpfCnpjExists) {
        throw new Error("CPF/CNPJ já cadastrado no sistema");
      }
    }

    const dataValidated: ValidatedFuncionarioData = {
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

    const result = await prismaClient.$transaction(async (tx) => {
      const funcaoMedico = await tx.funcao.findFirst({
        where: { idFuncao },
      });

      if (funcaoMedico?.nome === "Medico") {
        if (!crm || !especialidade || !ufCRM) {
          throw new Error(
            "Dados de médico faltando (CRM, especialidade ou UF/CRM)",
          );
        }

        const medicoCriado = await new CreateMedicoService().execute(
          data,
          tx as any,
        );

        return medicoCriado;
      }

      const funcionarioCriado = await tx.funcionario.create({
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
      });

      return funcionarioCriado;
    });

    return result;
  }
}

export { CreateFuncionarioService };
