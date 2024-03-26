import { Request, Response } from "express";
import Admin from "../models/Admin";
import {
  EntityAlreadyExists,
  EntityNotFound,
  InternalServerError,
} from "../exceptions/ExceptionHandler";
const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

export const getAllAdmins = async (req: Request, res: Response, next: any) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const adminSignup = async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    // This is not needed cuz we are already doing this in validations above and in route file
    // const existingAdmin = await Admin.findOne({ where: { email: email } });
    // if (existingAdmin) {
    //   return EntityAlreadyExists(res, "Admin with this email already exists");
    // }
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

export const loginAdmin = (req: Request, res: Response, next: any) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Admin.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error: any = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return password === user.password;
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error: any = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
        },
        "jwtsecret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};