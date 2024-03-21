import { Request, Response } from "express";
import AdverseAction from "../models/AdverseAction";
import Candidate from "../models/Candidate";
import { EntityNotFound, InternalServerError } from "../exceptions/ExceptionHandler";

export const getAllAdverseActionsForCandidate = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;
    const adverseActions = await AdverseAction.findAll({
      where: { candidateId: candidateId },
    });
    if (adverseActions.length == 0) {
      return res.status(200).json({
        message: `No adverse actions found for the candidate with id: ${candidateId}`,
      });
    }
    return res.status(200).json(adverseActions);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const createAdverseActionForCandidate = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const candidateId = req.params.candidateId;
    const { name, status, pre_notice_date, post_notice_date } = req.body;
    const adverseAction = await AdverseAction.create({
      name,
      status,
      pre_notice_date,
      post_notice_date,
      candidateId,
    });
    return res.status(201).json(adverseAction);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteAdverseAction = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    const adverseActionId = req.params.adverseActionId;
    const adverseAction = await AdverseAction.findByPk(adverseActionId);
    await adverseAction.destroy();
    return res.status(200).json(adverseAction);
  } catch (error) {
    return InternalServerError(res, error);
  }
};

export const deleteAllAdverseActionsForCandidate = async (
  req: Request,
  res: Response
) => {
  try {
    const candidateId = req.params.candidateId;

    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return EntityNotFound(res, candidateId)
    }

    await AdverseAction.destroy({
      where: { candidateId },
    });

    return res.status(200).json({
      message: `All adverse actions for candidate with ID ${candidateId} deleted`,
    });
  } catch (error) {
    return InternalServerError(res, error);
  }
};
