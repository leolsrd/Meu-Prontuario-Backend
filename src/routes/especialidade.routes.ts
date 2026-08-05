import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { CreateEspecialidadeController } from "../controllers/especialidade/CreateEspecialidadeController";
import { UpdateEspecialidadeController } from "../controllers/especialidade/UpdateEspecialidadeController";
import ListEspecialidadeController from "../controllers/especialidade/ListEspecialidadeController";
import {
  createEspecialidadeSchema,
  listEspecialidadeStatus,
  upadteEspecialidadeSchema,
} from "../schemas/especialidadeSchema";

const especialidadeRoutes: Router = Router();

especialidadeRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createEspecialidadeSchema),
  new CreateEspecialidadeController().handle,
);

especialidadeRoutes.put(
  "/:id",
  isAuthenticated,
  validateSchema(upadteEspecialidadeSchema),
  new UpdateEspecialidadeController().handle,
);

especialidadeRoutes.get(
  "/",
  isAuthenticated,
  new ListEspecialidadeController().getAll,
);

especialidadeRoutes.get(
  "/:status",
  isAuthenticated,
  validateSchema(listEspecialidadeStatus),
  new ListEspecialidadeController().getEspecialidadeStatus,
);

export default especialidadeRoutes;
