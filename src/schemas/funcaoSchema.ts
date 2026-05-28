import { z } from "zod";

export const createFuncaoSchema = z.object({
  body: z.object({
    funcao: z
      .string()
      .min(3, "A função deve ter pelo menos 3 caracteres")
      .trim(),
    descricao: z
      .string()
      .min(3, "A descricao deve ter pelo menos 3 caracteres")
      .trim()
      .or(z.literal(""))
      .optional(),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
  })
})
