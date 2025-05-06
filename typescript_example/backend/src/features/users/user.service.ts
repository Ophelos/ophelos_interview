import { PrismaClient, User } from "../../../generated/prisma_client";
import { RequiredUserData } from "./user.interfaces";

const prisma = new PrismaClient();

export const getUserById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
}

export const createUser = async (data: RequiredUserData): Promise<User> => {
    return prisma.user.create({ data })
}