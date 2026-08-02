import { z } from "zod";

export const createPlanoCategoriaSchema = z.object({
  body: z.object({
    nome: z
      .string()
      .min(3, "O nome da categoria do plano deve ter pelo menos 3 caracteres")
      .max(40, "O nome da categoria do plano deve ter no máximo 40 caracteres")
      .trim(),
    idOperadora: z.uuid({
      message: "O id da operadora é obrigatório",
    }),
  }),
});

let updateParamsSchemas = z.object({
  id: z.uuid({ message: "O id da categoria do plano é obrigatório" }),
});

let updateBodySchemas = z.object({
  nome: z
    .string()
    .min(3, "A categoria do plano deve ter pelo menos 3 caracteres")
    .max(40, "A categoria do plano deve ter no máximo 40 caracteres")
    .trim(),
  idOperadora: z.uuid({
    message: "O id da operadora é obrigatório",
  }),
});

export const updatePlanoCategoriaSchema = z.object({
  params: updateParamsSchemas,
  body: updateBodySchemas,
});
