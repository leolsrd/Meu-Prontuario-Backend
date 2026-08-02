import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { CreatePlanoCategoriaController } from "../controllers/planoCategoria/CreatePlanoCategoriaController";
import {
  createPlanoCategoriaSchema,
  updatePlanoCategoriaSchema,
} from "../schemas/planoCategoriaSchema";
import { UpdatePlanoCategoriaController } from "../controllers/planoCategoria/UpdatePlanoCategoriaController";
import { ListPlanoCategoriaController } from "../controllers/planoCategoria/ListPlanoCategoriaController";

const planoCategoriaRoutes: Router = Router();

// ? Rota para cadastrar plano categoria
planoCategoriaRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createPlanoCategoriaSchema),
  new CreatePlanoCategoriaController().handle,
);

// ? Rota para alterar um plano categoria
planoCategoriaRoutes.put(
  "/plano-categoria/atualizar",
  isAuthenticated,
  validateSchema(updatePlanoCategoriaSchema),
  new UpdatePlanoCategoriaController().handle,
);

// ? Rota para listar os planos categorias cadastrados
planoCategoriaRoutes.get(
  "/",
  isAuthenticated,
  new ListPlanoCategoriaController().handle,
);

export default planoCategoriaRoutes;
