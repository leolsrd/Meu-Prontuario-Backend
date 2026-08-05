import { Router, Request, Response } from "express";

import funcionarioRoutes from "./funcioario.routes";
import funcaoRoutes from "./funcao.routes";
import operadoraRoutes from "./operadora.routes";
import planoCategoriaRoutes from "./planoCategoria.routes";
import medicoRoutes from "./medico.routes";
import especialidadeRoutes from "./especialidade.routes";

const globalRouter: Router = Router();

globalRouter.get("/teste", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 😎" });
});

// Agrupamento por prefixos
globalRouter.use("/funcionario", funcionarioRoutes);
globalRouter.use("/funcao", funcaoRoutes);
globalRouter.use("/operadora", operadoraRoutes);
globalRouter.use("/plano-categoria", planoCategoriaRoutes);
globalRouter.use("/medico", medicoRoutes);
globalRouter.use("/especialidade", especialidadeRoutes);

export default globalRouter;
