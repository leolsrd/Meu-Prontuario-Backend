import { z } from "zod";

export const createPlanoCategoriaSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .min(3, "A categoria do plano deve ter pelo menos 3 caracteres")
      .max(40, "A categoria do plano deve ter no máximo 40 caracteres")
      .trim(),
  }),
});
