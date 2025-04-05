import {NextFunction, Request, Response} from "express";
import { HTTPSTATUS } from "../config/http.config";
import { getUserFromDb, registerService } from "../services/authService";
import jwt from "jsonwebtoken";

export const registerController = async (req: Request, res: Response) => {
    const body = req.body;

    const user = await registerService(body);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "User created successfully",
        user,
    });
}

export const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await getUserFromDb(email, password);

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        // secure: true,
        // maxAge: 1000000,
    });

    return res.status(HTTPSTATUS.OK).json({
        message: "User logged in successfully",
    });
}

export const userController = async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
      }

    return res.status(HTTPSTATUS.OK).json({
        user,
    });
}