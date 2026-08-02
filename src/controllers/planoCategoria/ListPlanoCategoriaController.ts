import { Request, Response } from "express";
import { ListPlanoCategoriaService } from "../../services/planoCategoria/ListPlanoCategoriaService";

class ListPlanoCategoriaController {
  async handle(req: Request, res: Response) {
    try {
      const listPlanoCategoriaService = new ListPlanoCategoriaService();

      const planoCategorias = await listPlanoCategoriaService.execute(req, res);

      return res.status(200).json(planoCategorias);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export { ListPlanoCategoriaController };
