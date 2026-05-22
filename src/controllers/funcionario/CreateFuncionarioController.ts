import { Request, Response } from "express";
import CreateFuncionarioService from "../../services/funcionario/CreateFuncionarioService";

class CreateFuncionarioController {

  async handle(req: Request, res: Response) {
    const data = req.body;

    const createFuncionarioService = new CreateFuncionarioService();

    const funcionario = await createFuncionarioService.execute(data);

    return res.status(201).json(funcionario);
  }
}

export { CreateFuncionarioController }
