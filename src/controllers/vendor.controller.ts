import { NextFunction, Request, Response } from "express";

export const meController = async (req: Request, res: Response) => {
    return res.send('Hello world');
}