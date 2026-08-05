import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { CreateEspecialidadeController } from "../controllers/especialidade/CreateEspecialidadeController";
// import { UpdateEspecialidadeController } from "../controllers/especialidade/UpdateEspecialidadeController";
// import { ListEspecialidadeController } from "../controllers/especialidade/ListEspecialidadeController";
import {
  createEspecialidadeSchema,
  // updateEspecialidadeSchema,
} from "../schemas/especialidadeSchema";

const especialidadeRoutes: Router = Router();

// * Rotas de Especialidades
// ? Rota para criar especialidade
especialidadeRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createEspecialidadeSchema),
  new CreateEspecialidadeController().handle,
);

export default especialidadeRoutes;
