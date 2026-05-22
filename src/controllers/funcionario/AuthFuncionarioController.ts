import { Request, Response } from 'express';
import { AuthFuncionarioService } from '../../services/funcionario/AuthFuncionarioService';

class AuthFuncionarioController {
  async handle(req: Request, res: Response) {
    const { login, senha } = req.body;

    const authFuncionarioService = new AuthFuncionarioService();

    const session = await authFuncionarioService.execute({ login, senha });

    return res.status(200).json(session);
  }
}

export default AuthFuncionarioController;
