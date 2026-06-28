import { Request, Response } from "express";
import { UpdatePlanoCategoriaService } from "../../services/planoCategoria/UpdatePlanoCategoriaService";

class UpdatePlanoCategoriaController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const updatePlanoCategoriaService = new UpdatePlanoCategoriaService();

      const planoCategoria = await updatePlanoCategoriaService.execute(
        req,
        res,
        data,
      );

      return res.status(200).json(planoCategoria);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdatePlanoCategoriaController };
