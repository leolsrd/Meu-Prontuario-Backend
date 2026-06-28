import { Request, Response } from "express";
import { ListPlanoCategoriaService } from "../../services/planoCategoria/ListPlanoCategoriaService";

class ListPlanoCategoriaController {
  async handle(req: Request, res: Response) {
    const listPlanoCategoriaService = new ListPlanoCategoriaService();

    const planoCategorias = await listPlanoCategoriaService.execute(req, res);

    return res.status(200).json(planoCategorias);
  }
}

export { ListPlanoCategoriaController };
