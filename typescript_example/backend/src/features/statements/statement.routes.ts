import { Router } from "express";
import { validate } from "../../middleware/validate";
import { createStatementSchema } from "./statement.schema";
import { createStatementHandler, listStatementsHandler } from "./statement.controller";

const router = Router({ mergeParams: true });

router.post("/", validate(createStatementSchema), createStatementHandler);

router.get("/", listStatementsHandler);

export default router;