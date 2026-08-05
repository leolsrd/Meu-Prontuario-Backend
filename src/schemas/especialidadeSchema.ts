import { z } from "zod";

export const createEspecialidadeSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .min(5, "A especialidade deve ter pelo menos 5 caracteres")
      .max(40, "A especialidade deve ter no máximo 40 caracteres")
      .trim(),
    status: z.coerce.boolean({ message: "O status deve ser true ou false" }),
  }),
});

const updateParamsSchemas = z.object({
  id: z.uuid({ message: "O id da especialidade é obrigatório" }),
});

const updateBodySchemas = z.object({
  nome: z
    .string()
    .min(5, "A especialidade deve ter pelo menos 5 caracteres")
    .max(40, "A especialidade deve ter no máximo 40 caracteres")
    .trim()
    .optional(),
  status: z.coerce
    .boolean({ message: "O status deve ser true ou false" })
    .optional(),
});

export const upadteEspecialidadeSchema = z.object({
  params: updateParamsSchemas,
  body: updateBodySchemas,
});

export const listEspecialidadeStatus = z.object({
  params: z.object({
    status: z.coerce.boolean({ message: "O status deve ser true ou false" }),
  }),
});
