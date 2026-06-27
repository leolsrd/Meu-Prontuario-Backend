import { Request, Response } from "express";
import { CreateOperadoraService } from "../../services/operadora/CreateOperadoraService";

class CreateOperadoraController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const createOperadoraService = new CreateOperadoraService();

    const operadora = await createOperadoraService.execute(req, res, data);

    return res.status(201).json(operadora);
  }
}

export { CreateOperadoraController };
