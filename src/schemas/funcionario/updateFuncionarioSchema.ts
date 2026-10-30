import { z } from "zod";
import {
  criarCodigoOpcionalComNull,
  criarCpfCnpjOpcionalComNull,
  criarDataNascimentoOpcionalComNull,
  criarEstadoOpcionalComNull,
  criarStringOpcionalComNull,
  criarTelefoneOpcionalComNull,
} from "../shared";

const especialidadeSchema = z.object({
  idEspecialidade: z
    .uuid({ message: "ID da especialidade inválido (deve ser UUID)." })
    .optional(),
  rqe: z
    .string()
    .min(3, { message: "O rqe deve ter pelo menos 3 caracteres" })
    .optional()
    .nullable(),
});

const updateFuncionarioBodySchemas = z
  .object({
    nome: criarStringOpcionalComNull(
      3,
      "O nome deve ter pelo menos 3 caracteres",
    ),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
    cpfCnpj: criarCpfCnpjOpcionalComNull(
      "CPF ou CNPJ inválido (verifique os dígitos digitados)",
    ),
    senha: criarStringOpcionalComNull(
      4,
      "A senha deve ter pelo menos 4 caracteres",
    ),
    telefone: criarTelefoneOpcionalComNull(
      "Telefone inválido. Deve conter o DDD e ter 10 (fixo) ou 11 (celular) dígitos.",
    ),
    dataNascimento: criarDataNascimentoOpcionalComNull(),
    cep: criarCodigoOpcionalComNull(8, "O CEP deve ter pelo menos 8 dígitos"),
    logradouro: criarStringOpcionalComNull(
      4,
      "O logradouro deve ter pelo menos 4 caracteres",
    ),
    complemento: criarStringOpcionalComNull(
      4,
      "O complemento deve ter pelo menos 4 caracteres",
    ),
    numero: z.number().optional(),
    bairro: criarStringOpcionalComNull(
      4,
      "O bairro deve ter pelo menos 4 caracteres",
    ),
    cidade: criarStringOpcionalComNull(
      3,
      "A cidade deve ter pelo menos 3 caracteres",
    ),
    uf: criarEstadoOpcionalComNull(
      "Estado inválido. Use uma sigla válida (exemplo: PE, BA, SP)",
    ),
    idFuncao: z
      .string()
      .uuid({ message: "O id da funcao deve ser um UUID válido" })
      .optional(),
    crm: z
      .string()
      .min(6, { message: "O CRM deve ter 6 caracteres" })
      .max(6, { message: "O CRM deve ter 6 caracteres" })
      .optional()
      .or(z.literal("")),
    ufCRM: z
      .string()
      .min(2, { message: "A UF/CRM deve ter pelo menos 2 caracteres" })
      .max(2, { message: "A UF/CRM deve ter no máximo 2 caracteres" })
      .optional()
      .or(z.literal("")),
    especialidades: z.array(especialidadeSchema).optional(),
  })
  .refine(
    (data) => {
      const temCRM = !!data.crm && data.crm !== "";
      const temUF = !!data.ufCRM && data.ufCRM !== "";
      return (temCRM && temUF) || (!temCRM && !temUF);
    },
    {
      message: "O CRM e UF/CRM devem ser informados juntos",
      path: ["crm"],
    },
  );

const updateFuncionarioParamsSchemas = z.object({
  idFuncionario: z
    .string()
    .uuid({ message: "O ID do funcionário fornecido é inválido." }),
});

export const updateFuncionarioSchema = z.object({
  params: updateFuncionarioParamsSchemas,
  body: updateFuncionarioBodySchemas,
});
