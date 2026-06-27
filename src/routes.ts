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
import { ListFuncionarioController } from "./controllers/funcionario/ListFuncionarioController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateFuncaoController } from "./controllers/funcao/CreateFuncaoController";
import { createFuncaoSchema, updateFuncaoSchema } from "./schemas/funcaoSchema";
import { UpdateFuncaoController } from "./controllers/funcao/UpdateFuncaoController";
import { ListMedicoController } from "./controllers/medico/ListMedicoController";
import {
  listMedicoEspecialidade,
  listMedicoStatus,
} from "./schemas/medicoSchema";
import {
  createOperadoraSchema,
  updateOperadoraSchema,
} from "./schemas/operadoraSchema";
import { CreateOperadoraController } from "./controllers/operadora/CreateOperadoraController";
import { ListOperadoraController } from "./controllers/operadora/ListOperadoraController";
import { UpdateOperadoraController } from "./controllers/operadora/UpdateOperadoraController";
import { CreatePlanoCategoriaController } from "./controllers/planoCategoria/CreatePlanoCategoriaController";
import { createPlanoCategoriaSchema } from "./schemas/planoCategoriaSchema";

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

// ? Rota para listar todos médicos
router.get(
  "/medicos",
  isAuthenticated,
  new ListMedicoController().getMedicoAll,
);

// ? Rota para listar os médicos por status
router.get(
  "/medicos/status",
  isAuthenticated,
  validateSchema(listMedicoStatus),
  new ListMedicoController().listMedicoStatus,
);

// ? Rota para listar os médicos por especialidade
router.get(
  "/medicos/especialidade",
  isAuthenticated,
  validateSchema(listMedicoEspecialidade),
  new ListMedicoController().listMedicoEspecialidade,
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

// ? Rota para atualizar funções
router.put(
  "/funcoes/atualizar",
  isAuthenticated,
  validateSchema(updateFuncaoSchema),
  new UpdateFuncaoController().handle,
);

// * Rotas de Operadoras
// ? Rota para criar uma Operadora
router.post(
  "/operadora",
  isAuthenticated,
  validateSchema(createOperadoraSchema),
  new CreateOperadoraController().handle,
);

// ? Rota para listar operadoras
router.get(
  "/operadoras/status",
  isAuthenticated,
  new ListOperadoraController().listOperadoraStatus,
);

// ? Rota para atualizar operadoras
router.put(
  "/operadora/atualizar",
  isAuthenticated,
  validateSchema(updateOperadoraSchema),
  new UpdateOperadoraController().handle,
);

// * Rota para Plano Categoria
// ? Rota para cadastrar plano categoria
router.post(
  "/plano-categoria",
  isAuthenticated,
  validateSchema(createPlanoCategoriaSchema),
  new CreatePlanoCategoriaController().handle,
);
