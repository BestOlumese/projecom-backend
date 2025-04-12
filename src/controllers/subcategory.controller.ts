import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import {
  createSubcategory,
  deleteSubcategory,
  getAllSubcategory,
  getSubcategoryById,
  updateSubcategory,
} from "../services/subcategoryService";
import { getCategoryById } from "../services/categoryService";

export const createSubcategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const getcategory = await getCategoryById(req.body.categoryId);

    if (!getcategory) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Category not found",
      });
    }

    const subcategory = await createSubcategory(req.body);

    if (!subcategory) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong, try again",
      });
    }

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Subcategory created successfully",
      subcategory,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, try again",
    });
  }
};

export const getAllSubcategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const subcategories = await getAllSubcategory();

    if (!subcategories) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong, try again",
      });
    }

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Subcategories fetched successfully",
      subcategories,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, try again",
    });
  }
};

export const updateSubcategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const getcategory = await getCategoryById(req.body.categoryId);

    if (!getcategory) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Category not found",
      });
    }
    
    const getsubcategory = await getSubcategoryById(req.params.id);

    if (!getsubcategory) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Subcategory not found",
      });
    }

    const subcategory = await updateSubcategory(req.params.id, req.body);

    if (!subcategory) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong, try again",
      });
    }

    return res.status(HTTPSTATUS.OK).json({
      message: "Subcategory updated successfully",
      subcategory,
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, try again",
    });
  }
};

export const deleteSubcategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const getsubcategory = await getSubcategoryById(req.params.id);

    if (!getsubcategory) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({
        message: "Subcategory not found",
      });
    }

    const category = await deleteSubcategory(req.params.id);

    if (!category) {
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong, try again",
      });
    }

    return res.status(HTTPSTATUS.NO_CONTENT).json({
      message: "SUbcategory deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong, try again",
    });
  }
};
