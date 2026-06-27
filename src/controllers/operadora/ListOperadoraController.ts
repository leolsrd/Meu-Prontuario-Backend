import { Request, Response } from "express";
import { ListOperadoraService } from "../../services/operadora/ListOperadoraService";

class ListOperadoraController {
  async listOperadoraStatus(req: Request, res: Response) {
    try {
      const status: boolean = req.query.status === "true" ? true : false;

      const listOperadoraService = new ListOperadoraService();

      const operadoras = await listOperadoraService.listOperadoraStatus(
        req,
        res,
        status,
      );

      return res.status(200).json(operadoras);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { ListOperadoraController };
