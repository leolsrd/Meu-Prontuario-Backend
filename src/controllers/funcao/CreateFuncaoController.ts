import { Request, Response, NextFunction } from "express";
import { CreateFuncaoService } from "../../services/funcao/CreateFuncaoService";

class CreateFuncaoController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const createFuncaoService = new CreateFuncaoService();

      const funcao = await createFuncaoService.execute(data);

      return res.status(201).json({
        message: "Funcao criada com sucesso",
        funcao,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });

      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
export { CreateFuncaoController };
