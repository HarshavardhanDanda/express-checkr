import { Request, Response, NextFunction } from "express";

export const InternalServerError = (res, error) => {
  console.log(error);
  return res.status(500).json({ error: "something went wrong!!" });
};

export const SuccessResponse = (req: Request, res: Response) => {
  res.status(200).json({ message: ` Updated successfully` });
};

export const EntityAlreadyExists = (res, message) => {
  return res.status(400).json({ error: message });
};

export const EntityNotFound = (res: Response, id) => {
  res.status(404).json({ message: `Entity not found with this id ${id}` });
};
