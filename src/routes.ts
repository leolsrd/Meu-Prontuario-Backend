import { Router, Request, Response } from "express";
import { validateSchema } from "./middlewares/validateSchema";
// * Funções
import { ListFuncaoController } from "./controllers/funcao/ListFuncaoController";
// * Funcionários
import AuthFuncionarioController from "./controllers/funcionario/AuthFuncionarioController";
import {
  authFuncinarioSchema,
  createFuncionarioSchema,
  updateFuncionarioSchema,
} from "./schemas/funcionarioSchema";
import { CreateFuncionarioController } from "./controllers/funcionario/CreateFuncionarioController";
import { UpdateFuncionarioController } from "./controllers/funcionario/UpdateFuncionarioController";
import { ListFuncionarioController } from "./controllers/funcionario/ListFuncaoController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateFuncaoController } from "./controllers/funcao/CreateFuncaoController";
import { createFuncaoSchema } from "./schemas/funcaoSchema";

const router: Router = Router();

router.get("/teste", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 😎" });
});

export { router };

// * Rotas de Funcionários
// ? Rota para criar funcionário
router.post(
  "/funcionario",
  isAuthenticated,
  validateSchema(createFuncionarioSchema),
  new CreateFuncionarioController().handle,
);

// ? Rota de Autenticação do funcionário
router.post(
  "/session",
  validateSchema(authFuncinarioSchema),
  new AuthFuncionarioController().handle,
);

// ? Rota para alterar funcionário?
router.put(
  "/funcionario/atualizar",
  isAuthenticated,
  validateSchema(updateFuncionarioSchema),
  new UpdateFuncionarioController().handle,
);

// ? Rota para listar funcionários
router.get(
  "/funcionario",
  isAuthenticated,
  new ListFuncionarioController().handle,
);

// * Rotas de Funções
// ? Rota para listar funções
router.get("/funcoes", isAuthenticated, new ListFuncaoController().handle);

// ? Rota para criar funções
router.post(
  "/funcoes",
  isAuthenticated,
  validateSchema(createFuncaoSchema),
  new CreateFuncaoController().handle,
);
