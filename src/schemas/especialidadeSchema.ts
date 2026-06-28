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

export const upadteEspecialidadeSchema = z.object({
  body: z.object({
    idEspecialidade: z.uuid({
      message: "O id da especialidade é obrigatório",
    }),
    nome: z
      .string()
      .min(5, "A especialidade deve ter pelo menos 5 caracteres")
      .max(40, "A especialidade deve ter no máximo 40 caracteres")
      .trim(),
    status: z.coerce.boolean({ message: "O status deve ser true ou false" }),
  }),
});
