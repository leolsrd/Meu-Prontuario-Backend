import { z } from "zod";

export const authFuncinarioSchema = z.object({
  body: z.object({
    login: z
      .string({ message: "O login é obrigatório" })
      .min(3, { message: "O login deve ter pelo menos 3 caracteres" })
      .trim(),
    senha: z
      .string({ message: "A senha é obrigatória" })
      .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
      .trim(),
  }),
});
