import { Router, Request, Response } from 'express';
import { ListFuncaoController } from './controllers/funcao/ListFuncaoController';
// * Funcionários
import AuthFuncionarioController from './controllers/funcionario/AuthFuncionarioController';
import { validateSchema } from './middlewares/validateSchema';
import { createFuncionarioSchema } from './schemas/funcionarioSchema';
import { CreateFuncionarioController } from './controllers/funcionario/CreateFuncionarioController';

const router: Router = Router();

router.get('/teste', (req: Request, res: Response) => {
  return res.json({ message: "Hello World 😎" });
})

export { router };

// * Rotas de Funcionários
// ? Rota para criar funcionário
router.post(
  "/funcionario",
  validateSchema(createFuncionarioSchema),
  new CreateFuncionarioController().handle
);

// ? Rota de Autenticação do funcionário
router.post(
  "/session",
  new AuthFuncionarioController().handle
)

// ? Rota para listar funcionários
router.get(
  "/funcionarios",
  new ListFuncaoController().handle
)


// * Rotas de Funções
// ^ Falta testar
router.get(
  "/funcoes",
  new ListFuncaoController().handle
)
