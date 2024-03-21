import { Request, Response } from "express";
import CandidateDetails from "../models/CandidateDetails";
import Candidate from "../models/Candidate";
import { EntityNotFound, InternalServerError } from "../exceptions/ExceptionHandler";

export const createCandidateDetails = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const {
      email,
      dob,
      phoneno,
      licence,
      social_security,
      packages,
      report_created_time,
      report_completed_time,
      turn_around_time,
    } = req.body;
    const candidateId = req.params.candidateId;
    const candidate_details = await CandidateDetails.create({
      email,
      phone_no: phoneno,
      date_of_birth: dob,
      drivers_licence: licence,
      social_security,
      package: packages,
      report_completed_time,
      report_created_time,
      turn_around_time,
      candidateId,
    });
    return res.status(201).json(candidate_details);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const getCandidateDetailsByCandidateId = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;

    const candidate = Candidate.findByPk(candidateId);
    if (!candidate) {
      return EntityNotFound(res, candidateId);
    }

    const candidate_details = await CandidateDetails.findOne({
      where: { candidateId: candidateId },
    });
    if (!candidate_details) {
      return EntityNotFound(res, candidateId);
    }

    return res.status(201).json(candidate_details);
  } catch (error) {
    return InternalServerError(res, error);
  }
};
