import { PrismaClient, Statement, Transaction } from "../../../generated/prisma_client";

const prisma = new PrismaClient();

export const createStatement = async (userId: number, name: string): Promise<Statement> => {
    return prisma.statement.create({
        data: { 
            user: { 
                connect: {
                 id: userId,
                },
            },
            name: name,
        },
    });
};

export const getStatementsByUser = async (userId: number): Promise<(Statement & { transactions: Transaction[] })[]> => {
    return prisma.statement.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { transactions: true },
    });
};