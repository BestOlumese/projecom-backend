import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { approveVendor, disapproveVendor, getAllVendors } from "../services/adminService";
import { vendorDetailsByUserId } from "../services/vendorService";

export const approveVendorController = async (req: Request, res: Response) => {
    try {
        // Assuming you have a function to approve the vendor
        const vendor = await vendorDetailsByUserId(req.body.userId);
        
        if(!vendor) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Vendor not found",
            });
        }

        const updateVendor = await approveVendor(req.body.userId);

        if(!updateVendor) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor approved successfully"
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

export const disapproveVendorController = async (req: Request, res: Response) => {
    try {
        // Assuming you have a function to disapprove the vendor
        const vendor = await vendorDetailsByUserId(req.body.userId);
        
        if(!vendor) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Vendor not found",
            });
        }

        const updateVendor = await disapproveVendor(req.body.userId);

        if(!updateVendor) {
            return res.status(HTTPSTATUS.BAD_REQUEST).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendor disapproved successfully"
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

export const getAllVendorsController = async (req: Request, res: Response) => {
    try {
        // Assuming you have a function to get all vendors
        const vendors = await getAllVendors(req.user.id);

        if(!vendors) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "No vendors found",
            });
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Vendors fetched successfully",
            vendors
        });
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}