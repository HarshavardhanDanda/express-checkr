const express = require("express");
import {
  getAllAdmins,
  createAdmin,
  getAdminById,
} from "../controllers/AdminController";
const AdminRouter = express.Router();

AdminRouter.get("/", getAllAdmins);
AdminRouter.get("/:adminId", getAdminById);
AdminRouter.post("/", createAdmin);

export default AdminRouter;
