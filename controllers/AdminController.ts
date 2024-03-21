import { Request, Response } from "express";
import Admin from "../models/Admin";
import {
  EntityAlreadyExists,
  EntityNotFound,
  InternalServerError,
} from "../exceptions/ExceptionHandler";

export const getAllAdmins = async (req: Request, res: Response, next: any) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createAdmin = async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ where: { email: email } });
    if (existingAdmin) {
      return EntityAlreadyExists(res, "Admin with this email already exists");
    }
    const admin = await Admin.create({
      name,
      email,
      password,
    });

    return res.status(201).json(admin);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getAdminById = async (req: Request, res: Response, next: any) => {
  try {
    const adminId = req.params.adminId;
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return EntityNotFound(res, adminId);
    }
    res.status(200).json(admin);
  } catch (error) {
    return InternalServerError(res, error);
  }
};
