import { Request, Response } from "express";
import { CreatePacienteService } from "../../services/paciente/CreatePacienteService";

class CreatePacienteController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    console.log(data);
    process.exit(1);

    const pacienteService = new CreatePacienteService();

    const paciente = await pacienteService.execute(req, res, data);

    return res.status(201).json(paciente);
  }
}
