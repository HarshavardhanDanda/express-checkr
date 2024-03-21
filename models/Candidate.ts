import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../database/db";
import AdverseAction from "./AdverseAction";
import CandidateDetails from "./CandidateDetails";

const Candidate = sequelize.define("candidate", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adjudication: {
    type: DataTypes.ENUM("adverse_action", "engage"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("clear", "consider", "scheduled"),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verification_date: {
    type: DataTypes.DATE,
  },
});

Candidate.hasMany(AdverseAction, {
  foreignKey: {
    name: "candidateId",
    allowNull: false, // Ensure AdverseAction cannot exist without Candidate
  },
  onDelete: "CASCADE", // Cascade delete if Candidate is deleted
  onUpdate: "CASCADE", // Cascade update if Candidate id is updated
});

// Define the association: AdverseAction belongs to a Candidate
AdverseAction.belongsTo(Candidate, {
  foreignKey: {
    name: "candidateId",
    allowNull: false, // Ensure AdverseAction cannot exist without Candidate
  },
});



Candidate.hasOne(CandidateDetails, {
  foreignKey: {
    name: "candidateId",
    allowNull: false, // AdverseAction cannot exist without Candidate
  },
  onDelete: "CASCADE", // Cascade delete if Candidate is deleted
  onUpdate: "CASCADE", // Cascade update if Candidate id is updated
});
CandidateDetails.belongsTo(Candidate, {
  foreignKey: {
    name: "candidateId",
    allowNull: false, // AdverseAction cannot exist without Candidate
  },
});

export default Candidate;
