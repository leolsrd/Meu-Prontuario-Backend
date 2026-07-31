import { Router, Request, Response } from "express";

import funcionarioRoutes from "./funcioario.routes";

const globalRouter: Router = Router();

globalRouter.get("/teste", (req: Request, res: Response) => {
  return res.json({ message: "Hello World 😎" });
});

// Agrupamento por prefixos
globalRouter.use("/funcionario", funcionarioRoutes);

export default globalRouter;
