import { z } from "zod";

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

export const createFuncionarioSchema = z.object({
  body: z
    .object({
      nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").trim(),
      login: z
        .string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
        .trim(),
      status: z.coerce.boolean({ message: "O status deve ser true ou false" }),
      cpfCnpj: z
        .string()
        .min(11, { message: "O CPF/CNPJ deve ter pelo menos 11 dígitos" })
        .max(14, { message: "O CPF/CNPJ deve ter no máximo 14 dígitos" })
        .trim()
        .optional(),
      senha: z
        .string()
        .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
        .trim()
        .optional(),
      telefone: z
        .string()
        .min(11, { message: "O telefone deve ter pelo menos 11 dígitos" })
        .optional()
        .default(""),
      dataNascimento: z
        .string()
        .refine(
          (val) => {
            const dataInput = new Date(val);

            if (isNaN(dataInput.getTime())) return false;

            const [ano, mes, dia] = val.split("-").map(Number);
            const dataExiste =
              dataInput.getUTCFullYear() === ano &&
              dataInput.getUTCMonth() + 1 === mes &&
              dataInput.getUTCDate() === dia;

            const naoENoFuturo = dataInput.getTime() <= new Date().getTime();

            return dataExiste && naoENoFuturo;
          },
          {
            message: "A data deve ser válida e não pode estar no futuro.",
          },
        )
        .optional(),
      cep: z
        .string()
        .min(8, { message: "O CEP deve ter pelo menos 8 dígitos" })
        .optional()
        .default("Não Informado"),
      logradouro: z
        .string()
        .min(3, { message: "O logradouro deve ter pelo menos 3 caracteres" })
        .optional()
        .default("Não Informado"),
      complemento: z
        .string()
        .min(3, { message: "O complemento deve ter pelo menos 3 caracteres" })
        .optional()
        .default("Não Informado"),
      numero: z.number().optional().default(0),
      bairro: z
        .string({ error: "Bairro não é String" })
        .min(3, { message: "O bairro deve ter pelo menos 3 caracteres" })
        .optional()
        .default("Não Informado"),
      cidade: z
        .string()
        .min(3, { message: "A cidade deve ter pelo menos 3 caracteres" })
        .optional()
        .default("Não Informado"),
      uf: z
        .string()
        .min(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .max(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .optional()
        .default("NI"),
      idFuncao: z.uuid({ message: "O id da funcao é obrigatório" }),
      crm: z
        .string()
        .min(6, { message: "O CRM deve ter 6 caracteres" })
        .max(6, { message: "O CRM deve ter 6 caracteres" })
        .optional()
        .default("")
        .or(z.literal("")),
      ufCRM: z
        .string()
        .min(2, { message: "A UF/CRM deve ter no mínimo 2 caracteres" })
        .max(2, { message: "A UF/CRM deve ter no máximo 2 caracteres" })
        .optional()
        .default("")
        .or(z.literal("")),
    })
    .refine(
      (data) => {
        if (data.crm && !data.ufCRM) {
          return false;
        } else if (data.crm && !data.ufCRM) {
          return false;
        } else if (!data.crm && data.ufCRM) {
          return false;
        } else if (!data.crm && data.ufCRM) {
          return false;
        }
        return true;
      },
      {
        error: "O CRM e UF/CRM devem ser informados juntos",
        path: ["crm", "ufCRM"],
      },
    ),
  especialidades: z.array(especialidadeSchema).optional(),
});

export const authFuncinarioSchema = z.object({
  body: z.object({
    login: z
      .string({ message: "O login é obrigatório" })
      .min(3, { message: "O login deve ter pelo menos 3 caracteres" })
      .trim(),
    senha: z
      .string({ message: "A senha é obrigatória" })
      .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
      .trim(),
  }),
});

export const updateFuncionarioSchema = z.object({
  body: z
    .object({
      idFuncionario: z.uuid({ message: "O id do funcionário é obrigatório" }),
      nome: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .trim()
        .optional(),
      login: z
        .string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
        .trim()
        .optional(),
      status: z.coerce
        .boolean({ message: "O status deve ser true ou false" })
        .optional(),
      cpfCnpj: z
        .string()
        .min(11, { message: "O CPF/CNPJ deve ter pelo menos 11 dígitos" })
        .max(14, { message: "O CPF/CNPJ deve ter no máximo 14 dígitos" })
        .trim()
        .or(z.literal(""))
        .optional(),
      senha: z
        .string()
        .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
        .trim()
        .optional(),
      telefone: z
        .string()
        .min(11, { message: "O telefone deve ter pelo menos 11 dígitos" })
        .trim()
        .or(z.literal(""))
        .optional()
        .default(""),
      dataNascimento: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Data inválida, formato esperado: YYYY-MM-DD",
        })
        .transform((val) => new Date(val))
        .refine((date) => date <= new Date(), {
          message: "A data de nascimento não pode ser no futuro.",
        })
        .refine(
          (date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            const monthDifference = today.getMonth() - date.getMonth();

            if (
              monthDifference < 0 ||
              (monthDifference === 0 && today.getDate() < date.getDate())
            ) {
              return age - 1 >= 18;
            }
            return age >= 18;
          },
          {
            message: "Você deve ter pelo menos 18 anos.",
          },
        )
        .optional(),
      cep: z
        .string()
        .min(8, { message: "O cep deve ter 8 dígitos" })
        .trim()
        .or(z.literal(""))
        .default("00.000-000"),
      logradouro: z
        .string()
        .min(3, { message: "O logradouro deve ter pelo menos 3 caracteres" })
        .or(z.literal(""))
        .optional(),
      complemento: z
        .string()
        .min(3, { message: "O complemento deve ter pelo menos 3 caracteres" })
        .or(z.literal(""))
        .optional(),
      numero: z.number().optional().default(0),
      bairro: z
        .string({ error: "Bairro não é String" })
        .min(3, { message: "O bairro deve ter pelo menos 3 caracteres" })
        .or(z.literal(""))
        .optional(),
      cidade: z
        .string()
        .min(3, { message: "A cidade deve ter pelo menos 3 caracteres" })
        .or(z.literal(""))
        .optional(),
      uf: z
        .string()
        .min(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .max(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .or(z.literal(""))
        .optional()
        .default("NI"),
      idFuncao: z.string().optional(),
      crm: z
        .string()
        .min(6, { message: "O CRM deve ter 6 caracteres" })
        .max(6, { message: "O CRM deve ter 6 caracteres" })
        .optional()
        .default("")
        .or(z.literal("")),
      ufCRM: z
        .string()
        .min(2, { message: "A UF/CRM deve ter pelo menos 2 caracteres" })
        .max(2, { message: "A UF/CRM deve ter no máximo 2 caracteres" })
        .optional()
        .default("")
        .or(z.literal("")),
    })
    .refine(
      (data) => {
        if (data.crm && !data.ufCRM) {
          return false;
        } else if (data.crm && !data.ufCRM) {
          return false;
        } else if (data.crm && data.ufCRM) {
          return false;
        } else if (!data.crm && data.ufCRM) {
          return false;
        } else if (!data.crm && data.ufCRM) {
          return false;
        } else if (!data.crm && !data.ufCRM) {
          return false;
        } else if (!data.crm && !data.ufCRM) {
          return true;
        }
        return true;
      },
      {
        error: "O CRM, e UF/CRM devem ser informados juntos",
        path: ["crm", "ufCRM"],
      },
    ),
});
