import express from "express";
import {
  getAllCandidates,
  createCandidate,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from "../controllers/CandidateController";
import {
  createAdverseActionForCandidate,
  deleteAdverseAction,
  deleteAllAdverseActionsForCandidate,
  getAllAdverseActionsForCandidate,
} from "../controllers/AdverseActionController";
import { createCandidateDetails, getCandidateDetailsByCandidateId } from "../controllers/CandidateDetailsController";

const candidateRouter = express.Router();

candidateRouter.get("/", getAllCandidates);
candidateRouter.get("/:candidateId", getCandidateById);
candidateRouter.post("/", createCandidate);
candidateRouter.put("/:candidateId", updateCandidate);
candidateRouter.delete("/:candidateId", deleteCandidate);

// <===========================================================>
// adverse action routes for candidates

candidateRouter.get(
  "/:candidateId/adverse",
  getAllAdverseActionsForCandidate
);
candidateRouter.post(
  "/:candidateId/adverse",
  createAdverseActionForCandidate
);
candidateRouter.delete(
  "/:candidateId/adverse/:adverseActionId",
  deleteAdverseAction
);
candidateRouter.delete(
  "/:candidateId/adverse",
  deleteAllAdverseActionsForCandidate
);

// <===========================================================>
// candidate details routes for candidates

candidateRouter.get(
  "/:candidateId/details",
  getCandidateDetailsByCandidateId
);
candidateRouter.post(
  "/:candidateId/details",
  createCandidateDetails
);

export default candidateRouter;
