import { Request, Response } from "express";
import { ListMedicoService } from "../../services/medico/ListMedicoService";

class ListMedicoController {
  async listMedicoStatus(req: Request, res: Response) {
    try {
      const status: boolean = req.query.status === "true" ? true : false;

      const listMedicoService = new ListMedicoService();

      const medicos = await listMedicoService.listMedicoStatus(
        req,
        res,
        status,
      );

      return res.status(200).json(medicos);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  async listMedicoEspecialidade(req: Request, res: Response) {
    try {
      const especialidade = req.query.especialidade as string;

      const listMedicoService = new ListMedicoService();

      const medicos = await listMedicoService.listMedicoEspecialidade(
        req,
        res,
        especialidade,
      );

      return res.status(200).json(medicos);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }

  async getMedicoAll(req: Request, res: Response) {
    try {
      // const { especialidade } = req.query;

      // console.log(especialidade);
      // process.exit(1);

      const listMedicoService = new ListMedicoService();

      const medicos = await listMedicoService.listMedicoAll();

      return res.status(200).json(medicos);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { ListMedicoController };
