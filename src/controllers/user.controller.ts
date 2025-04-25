import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { updateUser, updateUserImage, updateUserPassword } from "../services/userService";

export const userUpdateController = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        const { id } = req.user;
    
        const user = await updateUser(id, req.body);

        if(!user) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "User not found"
            });
        }

        delete user.password;
        delete user.verifyExpires;
        delete user.verifyToken;

        return res.status(HTTPSTATUS.OK).json({
            message: "User updated successfully",
            user
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}

export const userNewPasswordController = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        const { id } = req.user;
    
        const user = await updateUserPassword(id, req.body);

        if(!user) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "User old password not correct or not found"
            });
        }

        delete user.password;
        delete user.verifyExpires;
        delete user.verifyToken;

        return res.status(HTTPSTATUS.OK).json({
            message: "User password updated successfully"
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}

export const userUpdateImageController = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
        const { id } = req.user;
    
        const user = await updateUserImage(id, req.body);

        if(!user) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "User not found"
            });
        }

        delete user.password;
        delete user.verifyExpires;
        delete user.verifyToken;

        return res.status(HTTPSTATUS.OK).json({
            message: "User image updated successfully"
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}