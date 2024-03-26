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
import { body, param } from "express-validator/check";

const candidateRouter = express.Router();

candidateRouter.get("/", isAuth, getAllCandidates);
candidateRouter.get("/:candidateId", isAuth, getCandidateById);
candidateRouter.post(
  "/",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("adjudication").isIn(["adverse_action", "engage"]),
    body("status").isIn(["clear", "consider", "scheduled"]),
    body("location").trim().not().isEmpty(),
  ],
  createCandidate
);
candidateRouter.put(
  "/:candidateId",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("adjudication").isIn(["adverse_action", "engage"]),
    body("status").isIn(["clear", "consider", "scheduled"]),
    body("location").trim().not().isEmpty(),
  ],
  updateCandidate
);
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
  [
    param('candidateId').isUUID(), // Validate that candidateId is a valid UUID
    body('name').trim().not().isEmpty(),
    body('status').equals('scheduled'),
  ],
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
candidateRouter.post(
  "/:candidateId/details",
  isAuth,
  [
    param("candidateId").isUUID(), // Validate that candidateId is a valid UUID
    body("email").isEmail().normalizeEmail(),
    body("date_of_birth").optional().isISO8601(), // Assuming date_of_birth is optional and should be in ISO8601 format
    body("phone_no").optional().isNumeric(),
    body("drivers_licence").optional().trim(),
    body("social_security").optional().trim(),
    body("package").optional().trim(),
    body("report_created_time").optional().isISO8601(), // Assuming report_created_time is optional and should be in ISO8601 format
    body("report_completed_time").optional().isISO8601(), // Assuming report_completed_time is optional and should be in ISO8601 format
    body("turn_around_time").optional().isISO8601(), // Assuming turn_around_time is optional and should be in ISO8601 format
  ],
  createCandidateDetails
);

export default candidateRouter;
