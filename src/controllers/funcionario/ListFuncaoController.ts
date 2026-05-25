import { Request, Response } from "express";
import { ListFuncionarioService } from "../../services/funcionario/ListFuncionarioService";

class ListFuncionarioController {
  async handle(req: Request, res: Response) {
    const listFuncionarioService = new ListFuncionarioService();

    const result = await listFuncionarioService.execute();

    return res.status(200).json(result);
  }
}

export { ListFuncionarioController };
