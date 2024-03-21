import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../database/db";
import Candidate from "./Candidate";

export const Admin = sequelize.define<typeof Admin>("admin", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Admin.hasMany(Candidate);
Candidate.belongsTo(Admin);

export default Admin;