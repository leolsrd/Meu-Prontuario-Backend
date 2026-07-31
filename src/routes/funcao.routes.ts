import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { CreateFuncaoController } from "../controllers/funcao/CreateFuncaoController";
import { ListFuncaoController } from "../controllers/funcao/ListFuncaoController";
import { UpdateFuncaoController } from "../controllers/funcao/UpdateFuncaoController";
import {
  createFuncaoSchema,
  updateFuncaoSchema,
} from "../schemas/funcaoSchema";

// * Rotas de Funções
const funcaoRoutes: Router = Router();

// ? Rota para listar funções
funcaoRoutes.get("/", isAuthenticated, new ListFuncaoController().handle);

// ? Rota para criar funções
funcaoRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createFuncaoSchema),
  new CreateFuncaoController().handle,
);

// ? Rota para atualizar funções
funcaoRoutes.put(
  "/:id",
  isAuthenticated,
  validateSchema(updateFuncaoSchema),
  new UpdateFuncaoController().handle,
);

export default funcaoRoutes;
