import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema";
import AuthFuncionarioController from "../controllers/funcionario/AuthFuncionarioController";
// import { updateFuncionarioSchema } from "../schemas/funcionario/updateFuncionarioSchema";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateFuncionarioController } from "../controllers/funcionario/CreateFuncionarioController";
import { UpdateFuncionarioController } from "../controllers/funcionario/UpdateFuncionarioController";
import { ListFuncionarioController } from "../controllers/funcionario/ListFuncionarioController";
import { createFuncionarioSchema } from "../schemas/funcionario/createFuncionarioSchema";
import { authFuncinarioSchema } from "../schemas/funcionario/authFuncionarioSchema";
import { updateFuncionarioSchema } from "../schemas/funcionario/updateFuncionarioSchema";

// * Rotas de Funcionários
const funcionarioRoutes: Router = Router();

funcionarioRoutes.post(
  "/",
  isAuthenticated,
  validateSchema(createFuncionarioSchema),
  new CreateFuncionarioController().handle,
);

// ? Rota de Autenticação do funcionário
funcionarioRoutes.post(
  "/session",
  validateSchema(authFuncinarioSchema),
  new AuthFuncionarioController().handle,
);

// ? Rota para alterar funcionário?
funcionarioRoutes.put(
  "/:idFuncionario",
  isAuthenticated,
  validateSchema(updateFuncionarioSchema),
  new UpdateFuncionarioController().handle,
);

// ? Rota para listar funcionários
funcionarioRoutes.get(
  "/",
  isAuthenticated,
  new ListFuncionarioController().handle,
);

export default funcionarioRoutes;
