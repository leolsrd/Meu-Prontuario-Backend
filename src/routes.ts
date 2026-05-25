import { Router, Request, Response } from 'express';
import { validateSchema } from './middlewares/validateSchema';
// * Funções
import { ListFuncaoController } from './controllers/funcao/ListFuncaoController';
// * Funcionários
import AuthFuncionarioController from './controllers/funcionario/AuthFuncionarioController';
import { authFuncinarioSchema, createFuncionarioSchema, updateFuncionarioSchema } from './schemas/funcionarioSchema';
import { CreateFuncionarioController } from './controllers/funcionario/CreateFuncionarioController';
import { UpdateFuncionarioController } from './controllers/funcionario/UpdateFuncionarioController';

const router: Router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.json({ message: "Hello World 😎" });
})

export { router };

// * Rotas de Funcionários
router.post(
  "/funcionario",
  validateSchema(createFuncionarioSchema),
  new CreateFuncionarioController().handle
);

router.post(
  "/session",
  validateSchema(authFuncinarioSchema),
  new AuthFuncionarioController().handle,
)

// ^ Rota para alterar funcionário?
router.put(
  "/funcionario/atualizar",
  validateSchema(updateFuncionarioSchema),
  new UpdateFuncionarioController().handle
)


// * Rotas de Funções
// ^ Falta testar
router.get(
  "/funcoes",
  new ListFuncaoController().handle
)
