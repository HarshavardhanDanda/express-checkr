import Candidate from "../models/Candidate";
import { Request, Response } from "express";
import Admin from "../models/Admin";
import { EntityNotFound, InternalServerError } from "../exceptions/ExceptionHandler";

export const getAllCandidates = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidates = await Candidate.findAll();
    return res.status(200).json(candidates);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getCandidateById = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return EntityNotFound(res, candidateId);
    }
    return res.status(200).json(candidate);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createCandidate = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const { name, adjudication, status, location, verification_date } =
      req.body;
    const admin: typeof Admin = await Admin.findOne();
    const candidate = await Candidate.create({
      name,
      adjudication,
      status,
      location,
      verification_date,
      adminId: admin.id || null,
    });
    return res.status(201).json(candidate);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteCandidate = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return EntityNotFound(res, candidateId);
    }
    await candidate.destroy();
    return res
      .status(200)
      .json({ message: `deleted candidate with id ${candidateId}` });
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const updateCandidate = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;
    const { name, adjudication, status, location, verification_date } =
      req.body;
    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return EntityNotFound(res, candidateId);
    }
    const updatedCandidate = await candidate.update({
      name,
      adjudication,
      status,
      location,
      verification_date,
    });
    return res.status(200).json({
      message: `updated candidate with id ${candidateId}`,
      candidate: updatedCandidate,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};
