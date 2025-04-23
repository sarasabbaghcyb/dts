import express from "express";
import taskRouter from "./task/router";

const router = express.Router();

router.use("/task", taskRouter);

export default router;
