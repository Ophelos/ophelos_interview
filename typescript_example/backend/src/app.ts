import express from "express";
import { PrismaClient } from "../generated/prisma_client";
import { errorHandler } from "../middleware/errorHandler";
import userRoutes from "../src/features/users/user.routes";
import statementRoutes from "../src/features/statements/statement.routes";
import transactionRoutes from "../src/features/transactions/transaction.routes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Route Definitions
app.get("/", async (req, res) => {
    const userCount = await prisma.user.count();

    res.json(
        userCount == 0
        ? "No users have been created."
        : `${userCount} user/s has/have been created.`
    );
});

app.use("/api/users", userRoutes);
app.use("api/statements", statementRoutes);
app.use("api/transactions", transactionRoutes);

// Global error handler
app.use(errorHandler);

export default app;
