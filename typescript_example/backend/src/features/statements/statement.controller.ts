import { Request, Response } from 'express';
import { createStatement, getStatementsByUser } from './statement.service';
import { parseId } from '../../utils/parseId';

export const createStatementHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseId(req.params.id, "user Id");
        const statement = await createStatement(userId);
        res.status(201).json(statement);
    } catch (error: unknown) {
        if (error instanceof Error) { 
            res.status(400).json({ error: error.message }); 
        }
    }
};

export const listStatementsHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseId(req.params.id, "user Id");
        const statements = await getStatementsByUser(userId);
        res.json(statements);
    } catch (error: unknown) {
        if (error instanceof Error) { 
            res.status(400).json({ error: error.message }); 
        }
    }
};