import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { createCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../services/categoryService";

export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const category = await createCategory(req.body);

        if(!category) {
            return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.CREATED).json({
            message: "Category created successfully",
            category
        })
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

export const getAllCategoryController = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategory();

        if(!categories) {
            return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.CREATED).json({
            message: "Categories fetched successfully",
            categories
        })
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const getcategory = await getCategoryById(req.params.id);

        if(!getcategory) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Category not found",
            });
        }
        
        const category = await updateCategory(req.params.id, req.body);

        if(!category) {
            return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.OK).json({
            message: "Category updated successfully",
            category
        })
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const getcategory = await getCategoryById(req.params.id);

        if(!getcategory) {
            return res.status(HTTPSTATUS.NOT_FOUND).json({
                message: "Category not found",
            });
        }
        
        const category = await deleteCategory(req.params.id);

        if(!category) {
            return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong, try again",
            });
        }

        return res.status(HTTPSTATUS.NO_CONTENT).json({
            message: "Category deleted successfully"
        })
    } catch (error: unknown) {
        return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong, try again",
        });
    }
}

