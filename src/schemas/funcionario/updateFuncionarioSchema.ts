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

const updateFuncionarioBodySchemas = z
  .object({
    nome: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
      ),
    login: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z
          .string()
          .min(3, { message: "O login deve ter pelo menos 3 caracteres" })
          .optional(),
      ),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
    cpfCnpj: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z
          .string()
          .min(11, { message: "O CPF/CNPJ deve ter pelo menos 11 dígitos" })
          .max(14, { message: "O CPF/CNPJ deve ter no máximo 14 dígitos" })
          .or(z.literal(""))
          .optional(),
      ),
    senha: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z
          .string()
          .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
          .optional(),
      ),
    telefone: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z
          .string()
          .min(11, { message: "O telefone deve ter pelo menos 11 dígitos" })
          .or(z.literal(""))
          .optional(),
      ),
    dataNascimento: z
      .string()
      .optional() // .optional() movido para o início para blindar contra undefined
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Data inválida, formato esperado: YYYY-MM-DD",
      })
      .transform((val) => (val ? new Date(val) : undefined)) // Só transforma se existir
      .refine((date) => !date || date <= new Date(), {
        message: "A data de nascimento não pode ser no futuro.",
      })
      .refine(
        (date) => {
          if (!date) return true; // Se for opcional e não enviado, passa direto
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
      ),
    cep: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .pipe(
        z
          .string()
          .min(8, { message: "O cep deve ter 8 dígitos" })
          .or(z.literal(""))
          .optional(),
      ),
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
    numero: z.number().optional(),
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
      .optional(),
    idFuncao: z.string().optional(),
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
    .uuid({ message: "O id do funcionário é obrigatório" }),
});

export const updateFuncionarioSchema = z.object({
  params: updateFuncionarioParamsSchemas,
  body: updateFuncionarioBodySchemas,
});
