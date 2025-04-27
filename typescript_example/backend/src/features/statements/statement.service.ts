import { PrismaClient, Statement } from "../../../generated/prisma_client";

const prisma = new PrismaClient();

export const createStatement = async (userId: number): Promise<Statement> => {
    return prisma.statement.create({
        data: { 
            user: { 
                connect: {
                 id: userId 
                },
            },
        },
    });
};

export const getStatementsByUser = async (userId: number): Promise<Statement[]> => {
    return prisma.statement.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};