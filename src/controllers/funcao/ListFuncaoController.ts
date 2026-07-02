import { Request, Response } from "express";
import { ListFuncaoService } from "../../services/funcao/ListFuncaoService";

class ListFuncaoController {
  async handle(req: Request, res: Response) {
    try {
      const listFuncaoService = new ListFuncaoService();

      const resultFuncoes = await listFuncaoService.execute();

      return res.status(200).json({
        message: "Funções listadas com sucesso",
        resultFuncoes,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { ListFuncaoController };
