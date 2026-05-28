import { NextFunction, Request, Response } from "express";
import CreateFuncionarioService from "../../services/funcionario/CreateFuncionarioService";

class CreateFuncionarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const createFuncionarioService = new CreateFuncionarioService();

      const funcionario = await createFuncionarioService.execute(
        req,
        res,
        data,
      );

      return res.status(201).json(funcionario);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateFuncionarioController };
