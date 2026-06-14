import { z } from "zod";

export const listMedicoStatus = z.object({
  query: z.object({
    status: z.coerce.boolean({ message: "O status deve ser true ou false" }),
  }),
});

export const listMedicoEspecialidade = z.object({
  query: z.object({
    especialidade: z
      .string()
      .trim()
      .min(3, "A especialidade deve ter pelo menos 3 caracteres")
      .max(50, "A especialidade deve ter no máximo 40 caracteres"),
  }),
});
