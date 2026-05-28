import { Request, Response, NextFunction } from "express";
import { CreateFuncaoService } from "../../services/funcao/CreateFuncaoService";

class CreateFuncaoController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const createFuncaoService = new CreateFuncaoService();

      const funcao = await createFuncaoService.execute(req, res, next, data);

      return res.status(201).json(funcao);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}
export { CreateFuncaoController };
