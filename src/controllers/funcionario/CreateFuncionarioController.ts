import { NextFunction, Request, Response } from "express";
import { CreateFuncionarioService } from "../../services/funcionario/CreateFuncionarioService";

class CreateFuncionarioController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const createFuncionarioService = new CreateFuncionarioService();

      const funcionario = await createFuncionarioService.execute(data);

      return res.status(201).json({
        message: "Funcionario criado com sucesso",
        funcionario,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { CreateFuncionarioController };
