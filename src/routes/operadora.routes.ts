import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { CreateOperadoraController } from "../controllers/operadora/CreateOperadoraController";
import { ListOperadoraController } from "../controllers/operadora/ListOperadoraController";
import { UpdateOperadoraController } from "../controllers/operadora/UpdateOperadoraController";
import {
  createOperadoraSchema,
  updateOperadoraSchema,
  listOperadoraStatusSchema,
} from "../schemas/operadoraSchema";

const operadoraRoutes: Router = Router();

// * Rotas de Operadoras
// ? Rota para criar uma Operadora
operadoraRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createOperadoraSchema),
  new CreateOperadoraController().handle,
);

// ? Rota para listar operadoras por status
operadoraRoutes.get(
  "/status",
  isAuthenticated,
  validateSchema(listOperadoraStatusSchema),
  new ListOperadoraController().listOperadoraStatus,
);

// ? Rota para listar todas operadoras
operadoraRoutes.get(
  "/",
  isAuthenticated,
  new ListOperadoraController().listOperadoraAll,
);

// ? Rota para atualizar operadoras
operadoraRoutes.put(
  "/:id",
  isAuthenticated,
  validateSchema(updateOperadoraSchema),
  new UpdateOperadoraController().handle,
);

export default operadoraRoutes;
