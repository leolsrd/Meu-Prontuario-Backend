import { Request, Response } from "express";
import { CreatePlanoCategoriaService } from "../../services/planoCategoria/CreatePlanoCategoriaService";

class CreatePlanoCategoriaController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const planoCategoriaService = new CreatePlanoCategoriaService();

    const planoCategoria = await planoCategoriaService.execute(req, res, data);

    return res.status(201).json(planoCategoria);
  }
}

export { CreatePlanoCategoriaController };
