import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../database/db";
import Candidate from "./Candidate";

const CandidateDetails = sequelize.define("candidate_details", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  phone_no: {
    type: DataTypes.DOUBLE,
  },
  drivers_licence: {
    type: DataTypes.STRING,
  },
  social_security: {
    type: DataTypes.STRING,
  },
  package: {
    type: DataTypes.STRING,
  },
  report_created_time: { type: DataTypes.TIME },
  report_completed_time: { type: DataTypes.TIME },
  turn_around_time: { type: DataTypes.TIME },
});

module.exports = CandidateDetails;
export default CandidateDetails;
