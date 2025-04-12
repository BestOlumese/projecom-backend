import { Request, Response } from "express";
import { createVendor, updateVendor, vendorDetailsByUserId } from "../services/vendorService";
import { HTTPSTATUS } from "../config/http.config";
import { updateUserRole } from "../services/userService";

export const getVendorDetails = async (req: Request, res: Response) => {
    try {
        const vendor = await vendorDetailsByUserId(req.user.id);

        if(!vendor) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Vendor not found"
            })
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor fetched successfully",
            vendor
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}

export const getVendorByIdDetails = async (req: Request, res: Response) => {
    try {
        const vendor = await vendorDetailsByUserId(req.params.userId);

        if(!vendor) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Vendor not found"
            })
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor fetched successfully",
            vendor
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        });
    }
}

export const createVendorDetails = async (req: Request, res: Response) => {
    try {
        const existingVendor = await vendorDetailsByUserId(req.user.id);

        if (existingVendor) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Vendor already exists for this user"
            });
        }

        const vendor = await createVendor(req.user.id, req.body)

        if(req.user.role !== "ADMIN") {
            await updateUserRole(req.user.id, "VENDOR");
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor created successfully",
            vendor
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}

export const updateVendorDetails = async (req: Request, res: Response) => {
    try {
        const vendor = await updateVendor(req.user.id, req.body)

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor updated successfully",
            vendor
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong try again'
        })
    }
}