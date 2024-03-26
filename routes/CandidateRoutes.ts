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
import {
  createCandidateDetails,
  getCandidateDetailsByCandidateId,
} from "../controllers/CandidateDetailsController";
import { isAuth } from "../middleware/isAuth";

const candidateRouter = express.Router();

candidateRouter.get("/", isAuth, getAllCandidates);
candidateRouter.get("/:candidateId", isAuth, getCandidateById);
candidateRouter.post("/", isAuth, createCandidate);
candidateRouter.put("/:candidateId", isAuth, updateCandidate);
candidateRouter.delete("/:candidateId", isAuth, deleteCandidate);

// <===========================================================>
// adverse action routes for candidates

candidateRouter.get(
  "/:candidateId/adverse",
  isAuth,
  getAllAdverseActionsForCandidate
);
candidateRouter.post(
  "/:candidateId/adverse",
  isAuth,
  createAdverseActionForCandidate
);
candidateRouter.delete(
  "/:candidateId/adverse/:adverseActionId",
  isAuth,
  deleteAdverseAction
);
candidateRouter.delete(
  "/:candidateId/adverse",
  isAuth,
  deleteAllAdverseActionsForCandidate
);

// <===========================================================>
// candidate details routes for candidates

candidateRouter.get(
  "/:candidateId/details",
  isAuth,
  getCandidateDetailsByCandidateId
);
candidateRouter.post("/:candidateId/details", isAuth, createCandidateDetails);

export default candidateRouter;
