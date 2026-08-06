import { Router } from "express";
import { ExampleController } from "./controllers";
const router = Router();

router.get("/example", ExampleController.getExampleData);

export default router;
