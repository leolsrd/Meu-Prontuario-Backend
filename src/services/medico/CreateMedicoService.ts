import prismaClient from "../../prisma";
import { MedicoServiceProps } from "../../@types/medico.types";
import { IEspecialidadeServiceProps } from "../../@types/especialidade.types";

class CreateMedicoService {
  async execute(data: MedicoServiceProps, tx = prismaClient) {
    const crmExist = await tx.medico.findFirst({
      where: {
        crm: data.crm,
      },
    });

    if (crmExist) {
      throw new Error("CRM já cadastrado");
    }

    let listaEspecialidades = data.especialidade
      ?.map((esp) => ({
        idEspecialidade: esp.idEspecialidade?.trim(),
        rqe: esp.rqe?.trim(),
      }))
      .filter((esp) => !!esp.idEspecialidade);

    let listEspecialidadesValid: IEspecialidadeServiceProps[] = [];

    if (listaEspecialidades && listaEspecialidades.length > 0) {
      const idsBuscados = listaEspecialidades.map(
        (esp) => esp.idEspecialidade as string,
      );

      const especialidadesCadastradas = await tx.especialidade.findMany({
        where: {
          idEspecialidade: { in: idsBuscados },
        },
        select: { idEspecialidade: true },
      });

      if (idsBuscados.length !== especialidadesCadastradas.length) {
        throw new Error(
          "Algumas especialidades informadas não foram encontradas no banco de dados.",
        );
      }

      listEspecialidadesValid = listaEspecialidades;
    } else {
      const getEspecialidadeClinicoGeral = await tx.especialidade.findFirst({
        where: { nome: "Clínico Geral" },
        select: { idEspecialidade: true },
      });

      if (!getEspecialidadeClinicoGeral) {
        throw new Error(
          "Especialidade 'Clínico Geral' não cadastrada no banco de dados.",
        );
      }

      listEspecialidadesValid = [
        {
          idEspecialidade: getEspecialidadeClinicoGeral.idEspecialidade,
          rqe: "0000",
        },
      ];
    }

    const medico = await tx.medico.create({
      data: {
        crm: data.crm,
        ufCRM: data.ufCRM,
        funcionario: {
          create: {
            login: data.login,
            nome: data.nome,
            idFuncao: data.idFuncao,
            status: data.status,
            cpfCnpj: data.cpfCnpj,
            senha: data.senha,
            telefone: data.telefone,
            dataNascimento: data.dataNascimento,
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            numero: data.numero,
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf,
          },
        },
        medicoEspecialidade: {
          create: listEspecialidadesValid.map((esp) => ({
            idEspecialidade: esp.idEspecialidade!,
            rqe: esp.rqe,
          })),
        },
      },
      select: {
        crm: true,
        ufCRM: true,
        funcionario: {
          select: {
            login: true,
            nome: true,
            funcao: {
              select: {
                idFuncao: true,
                nome: true,
              },
            },
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
          },
        },
        medicoEspecialidade: {
          select: {
            idEspecialidade: true,
            rqe: true,
            especialidade: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    return medico;
  }
}

export { CreateMedicoService };
