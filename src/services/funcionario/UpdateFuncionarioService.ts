import prismaClient from "../../prisma";
import { validateAndHashPassword } from "../../utils/validateAndHashPassword.utils";
import removeMascaraDevolveNumero from "../../utils/removeMascara.utils";
import { StringVaziaOrUndefinedSetNull } from "../../utils/stringVaziaSetNull.utils";
import { UpdateMedicoServiceProps } from "../../@types/medico.types";
import { UpdateMedicoService } from "../medico/UpdateMedicoService";
import { parseStatusUpdate } from "../../utils/parseBoolean.utils";
import { formatAndValidateDateOfBirth } from "../../utils/formatAndValidateDateOfBirth.utils";
import { removeUndefinedFields } from "../../utils/removeUndefinedFields.utils";
import { validarCpfCnpj } from "../../utils/validarCpfCnpj.utils";

class UpdateFuncionarioService {
  async execute(data: UpdateMedicoServiceProps) {
    const login = data.login?.trim();
    const nome = data.nome?.trim();
    const idFuncao = data.idFuncao?.trim();
    const idFuncionario = data.idFuncionario?.trim();

    if (data.login !== undefined && !login) {
      throw new Error("Login não pode ser vazio");
    }

    if (data.nome !== undefined && !nome) {
      throw new Error("Nome não pode ser vazio");
    }

    if (data.idFuncao !== undefined && !idFuncao) {
      throw new Error("Função do funcionário não pode ser vazia");
    }

    if (data.idFuncionario !== undefined && !idFuncionario) {
      throw new Error("ID do funcionário não pode ser vazio");
    }

    removeUndefinedFields(data.login);

    removeUndefinedFields(data.nome);

    removeUndefinedFields(data.idFuncao);

    removeUndefinedFields(data.idFuncionario);

    const idFuncionarioExists = await prismaClient.funcionario.findFirst({
      where: {
        idFuncionario: data.idFuncionario,
      },
      select: {
        idFuncionario: true,
        idFuncao: true,
      },
    });

    if (!idFuncionarioExists) {
      throw new Error("Funcionário não encontrado");
    }

    const idFuncaoParaValidar = data.idFuncao ?? idFuncionarioExists.idFuncao;

    if (data.idFuncao !== undefined) {
      const idFuncaoExists = await prismaClient.funcao.findFirst({
        where: {
          idFuncao: idFuncaoParaValidar,
        },
      });

      if (!idFuncaoExists) {
        throw new Error("Função do funcionário não encontrada");
      }
    }

    if (data.senha !== undefined) {
      const senhaTrimmed = data.senha.trim();

      if (senhaTrimmed && senhaTrimmed.length < 4) {
        throw new Error("Senha deve ter pelo menos 4 caracteres");
      }
    }

    if (data.dataNascimento !== undefined) {
      const dataNascimentoValidada = formatAndValidateDateOfBirth(
        data.dataNascimento,
      );

      if (data.dataNascimento && !dataNascimentoValidada) {
        throw new Error("Data de nascimento inválida");
      }

      data.dataNascimento = dataNascimentoValidada
        ? (dataNascimentoValidada as Date)
        : undefined;
    }

    data.status = parseStatusUpdate(data.status!);

    if (data.telefone !== undefined) {
      if (data.telefone === "") {
        data.telefone = StringVaziaOrUndefinedSetNull(data.telefone);
      } else if (data.telefone) {
        data.telefone = removeMascaraDevolveNumero(data.telefone);
      }
    }

    if (data.cep !== undefined) {
      if (data.cep === "") {
        data.cep = StringVaziaOrUndefinedSetNull(data.cep);
      } else if (data.cep) {
        data.cep = removeMascaraDevolveNumero(data.cep);
      }
    }

    if (data.cpfCnpj !== undefined) {
      if (data.cpfCnpj === "") {
        data.cpfCnpj = StringVaziaOrUndefinedSetNull(data.cpfCnpj);
      } else if (data.cpfCnpj) {
        data.cpfCnpj = validarCpfCnpj(data.cpfCnpj);

        if (data.cpfCnpj) {
          data.cpfCnpj = removeMascaraDevolveNumero(data.cpfCnpj);
        }
      }
    }

    const cpfCnpjExists = data.cpfCnpj
      ? await prismaClient.funcionario.findFirst({
          where: {
            AND: [
              { cpfCnpj: data.cpfCnpj },
              { cpfCnpj: { not: null } },
              { idFuncionario: { not: data.idFuncionario } },
            ],
          },
        })
      : null;

    if (cpfCnpjExists && data.cpfCnpj) {
      throw new Error("CPF/CNPJ já cadastrado no sistema");
    }

    const loginExists = data.login
      ? await prismaClient.funcionario.findFirst({
          where: {
            login: data.login,
            idFuncionario: { not: data.idFuncionario },
          },
        })
      : null;

    if (loginExists && data.login) {
      throw new Error("Login já cadastrado no sistema");
    }

    const result = await prismaClient.$transaction(async (tx) => {
      // * Validação para médicos
      const getFuncaoMedico = await tx.funcao.findFirst({
        where: {
          idFuncao: idFuncaoParaValidar,
        },
      });

      if (getFuncaoMedico?.nome === "Medico") {
        if (data.crm && data.especialidade && data.ufCRM) {
          const medicoCriado = await new UpdateMedicoService().execute(
            data,
            tx as any,
          );

          return medicoCriado;
        } else {
          throw new Error(
            "Dados de médico faltando (CRM, especialidade e UF/CRM)",
          );
        }
      } else {
        const senhaHash = data.senha
          ? await validateAndHashPassword(data.senha)
          : undefined;

        const funcionarioCriado = await tx.funcionario.update({
          where: {
            idFuncionario: data.idFuncionario,
          },
          data: {
            status: data.status,
            nome: data.nome,
            cpfCnpj: data.cpfCnpj,
            login: data.login,
            ...(senhaHash ? { senha: senhaHash } : {}),
            telefone: data.telefone,
            dataNascimento: data.dataNascimento,
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf,
            idFuncao: data.idFuncao,
          },
        });

        return funcionarioCriado;
      }
    });

    return result;
  }
}

export { UpdateFuncionarioService };
