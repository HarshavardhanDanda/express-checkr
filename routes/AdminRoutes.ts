const express = require("express");
const { body } = require("express-validator/check");

import {
  getAllAdmins,
  adminSignup,
  getAdminById,
  loginAdmin,
} from "../controllers/AdminController";
import { isAuth } from "../middleware/isAuth";
import Admin from "../models/Admin";
const AdminRouter = express.Router();

AdminRouter.get("/", isAuth, getAllAdmins);
AdminRouter.get("/:adminId", getAdminById);
AdminRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Admin.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!"); //here we can also throw error but use async/await 
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  adminSignup
);

AdminRouter.post("/login", loginAdmin);

export default AdminRouter;
