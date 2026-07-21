import { Request, Response } from "express";
import { ListOperadoraService } from "../../services/operadora/ListOperadoraService";

class ListOperadoraController {
  async listOperadoraStatus(req: Request, res: Response) {
    try {
      const status: boolean = req.query.status === "true" ? true : false;

      const listOperadoraService = new ListOperadoraService();

      const operadoras = await listOperadoraService.listOperadoraStatus(status);

      return res.status(200).json({
        message: "Operadoras listadas com sucesso",
        operadoras,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async listOperadoraAll(req: Request, res: Response) {
    try {
      const listOperadoraService = new ListOperadoraService();

      const operadoras = await listOperadoraService.listOperadoraAll();

      return res.status(200).json({
        message: "Operadoras listadas com sucesso",
        operadoras,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { ListOperadoraController };
