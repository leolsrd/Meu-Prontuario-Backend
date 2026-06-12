import { Request, Response } from "express";
import { UpdateFuncionarioService } from "../../services/funcionario/UpdateFuncionarioService";

class UpdateFuncionarioController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const updateFuncionarioService = new UpdateFuncionarioService();

    const funcionario = await updateFuncionarioService.execute(res, req, data);

    return res.status(200).json(funcionario);
  }
}

export { UpdateFuncionarioController };
