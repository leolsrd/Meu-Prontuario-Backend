import { z } from "zod";

export const createFuncaoSchema = z.object({
  body: z.object({
    nome: z.string().min(3, "A função deve ter pelo menos 3 caracteres").trim(),
    descricao: z
      .string()
      .min(3, "A descricao deve ter pelo menos 3 caracteres")
      .trim()
      .or(z.literal(""))
      .optional(),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
  }),
});

export const updateFuncaoSchema = z.object({
  body: z.object({
    idFuncao: z.uuid(),
    nome: z
      .string()
      .min(3, "A função deve ter pelo menos 3 caracteres")
      .trim()
      .optional(),
    descricao: z
      .string()
      .min(3, "A descricao deve ter pelo menos 3 caracteres")
      .trim()
      .or(z.literal(""))
      .optional(),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
  }),
});
