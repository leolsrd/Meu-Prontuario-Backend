import { Request, Response } from "express";
import { UpdateOperadoraService } from "../../services/operadora/UpdateOperadoraService";

class UpdateOperadoraController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;

      const updateOperadoraService = new UpdateOperadoraService();
      const operadoraUpdate = await updateOperadoraService.execute(
        req,
        res,
        data,
      );
      return res.json(operadoraUpdate);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOperadoraController };
