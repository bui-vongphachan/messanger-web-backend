import { Router, Request, Response } from "express";
const router = Router();

router.get("/v1/dummy", async (req: Request, res: Response) => {
  return res.json("OK");
});

export { router as dummyRouter };
