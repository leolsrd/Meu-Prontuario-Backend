import { Request, Response } from "express";
import prismaClient from "../../prisma";
import { CreatePacienteProps } from "../../@types/paciente.types";

class CreatePacienteService {
  async execute(req: Request, res: Response, data: CreatePacienteProps) {
    try {
      // ^ Começar a lógica
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
  }
}

export { CreatePacienteService };
