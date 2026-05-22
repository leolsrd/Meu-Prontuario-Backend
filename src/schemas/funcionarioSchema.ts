import { z } from "zod";

export const createFuncionarioSchema = z.object({
  body: z.object({
    nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .trim(),
    login: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
      .trim(),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" }),
    cpfCnpj: z
      .string()
      .min(11, { message: "O CPF/CNPJ deve ter pelo menos 11 dígitos" })
      .max(14, { message: "O CPF/CNPJ deve ter no máximo 14 dígitos" })
      .trim()
      .optional(),
    senha: z
      .string()
      .min(4, { message: "A senha deve ter pelo menos 8 caracteres" })
      .trim()
      .optional(),
    telefone: z
      .string()
      .min(11, { message: "O telefone deve ter pelo menos 11 dígitos" })
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
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      const monthDifference = today.getMonth() - date.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < date.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }, {
      message: "Você deve ter pelo menos 18 anos.",
    })
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
    numero: z
      .number()
      .optional()
      .default(0),
    bairro: z
      .string({error: "Bairro não é String"})
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
    idFuncao: z.string(),
  })
});
