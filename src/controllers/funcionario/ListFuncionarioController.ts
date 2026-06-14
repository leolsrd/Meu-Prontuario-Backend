import { Request, Response } from "express";
import { ListMedicoService } from "../../services/medico/ListMedicoService";

class ListFuncionarioController {
  async handle(req: Request, res: Response) {
    const listMedicoService = new ListMedicoService();

    const result = await listMedicoService.execute();

    return res.status(200).json(result);
  }
}

export { ListFuncionarioController };
