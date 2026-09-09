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
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }) // Corrigido de "nome" para "login"
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
        .nullable(), // Ajustado de .default("") para economizar espaço
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
        .nullable()
        .optional(),
      logradouro: z
        .string()
        .min(3, { message: "O logradouro deve ter pelo menos 3 caracteres" })
        .nullable()
        .optional(),
      complemento: z
        .string()
        .min(3, { message: "O complemento deve ter pelo menos 3 caracteres" })
        .nullable()
        .optional(),
      numero: z.number().optional().default(0),
      bairro: z
        .string({ error: "Bairro não é String" })
        .min(3, { message: "O bairro deve ter pelo menos 3 caracteres" })
        .nullable()
        .optional(),
      cidade: z
        .string()
        .min(3, { message: "A cidade deve ter pelo menos 3 caracteres" })
        .nullable()
        .optional(),
      uf: z
        .string()
        .min(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .max(2, { message: "A UF deve ter pelo menos 2 caracteres" })
        .optional()
        .nullable(), // Removido .default("NI") para salvar como NULL
      idFuncao: z.uuid({ message: "O id da funcao é obrigatório" }),
      crm: z
        .string()
        .min(6, { message: "O CRM deve ter 6 caracteres" })
        .max(6, { message: "O CRM deve ter 6 caracteres" })
        .optional()
        .nullable(), // Ajustado para evitar conflito com strings vazias padrão
      ufCRM: z
        .string()
        .min(2, { message: "A UF/CRM deve ter no mínimo 2 caracteres" })
        .max(2, { message: "A UF/CRM deve ter no máximo 2 caracteres" })
        .optional()
        .nullable(),
      especialidades: z.array(especialidadeSchema).optional(),
    })
    .refine(
      (data) => {
        // CORREÇÃO 2: Lógica simplificada e limpa para validação conjunta
        const temCRM = !!data.crm && data.crm !== "";
        const temUF = !!data.ufCRM && data.ufCRM !== "";

        // Se informou um, obrigatoriamente tem que informar o outro
        return (temCRM && temUF) || (!temCRM && !temUF);
      },
      {
        message: "O CRM e UF/CRM devem ser informados juntos.", // Mudado de 'error' para 'message'
        path: ["crm"], // O Zod joga o erro apontando para o campo crm
      },
    ),
});
