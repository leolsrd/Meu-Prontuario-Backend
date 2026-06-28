import { z } from "zod";

export const createOperadoraSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .min(3, "A operadora deve ter pelo menos 3 caracteres")
      .trim(),
    registroAns: z
      .number({
        message: "O registro ANS deve ser um número",
      })
      .refine((val) => val.toString().length === 6, {
        message: "O número deve ter exatamente 6 dígitos",
      }),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
  }),
});

export const updateOperadoraSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .min(3, "A operadora deve ter pelo menos 3 caracteres")
      .trim()
      .optional(),
    registroAns: z
      .number({
        message: "O registro ANS deve ser um número",
      })
      .refine((val) => val.toString().length === 6, {
        message: "O número deve ter exatamente 6 dígitos",
      })
      .optional(),
    status: z.coerce
      .boolean({ message: "O status deve ser true ou false" })
      .optional(),
    idOperadora: z.uuid({ message: "O id da operadora é obrigatório" }),
  }),
});
