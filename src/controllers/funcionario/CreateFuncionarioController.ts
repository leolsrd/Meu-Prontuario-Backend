import { NextFunction, Request, Response } from "express";
import { CreateFuncionarioService } from "../../services/funcionario/CreateFuncionarioService";

class CreateFuncionarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    const createFuncionarioService = new CreateFuncionarioService();

    const funcionario = await createFuncionarioService.execute(data);

    return res.status(201).json({
      message: "Funcionario criado com sucesso",
      funcionario,
    });
  }
}

export { CreateFuncionarioController };
