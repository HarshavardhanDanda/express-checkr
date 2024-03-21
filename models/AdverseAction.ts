import { DataTypes, UUID, UUIDV4 } from "sequelize";
import sequelize from "../database/db";

const AdverseAction = sequelize.define<typeof AdverseAction>("adverse_action", {
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
  status: {
    type: DataTypes.ENUM("scheduled"),
    allowNull: false,
  },
  pre_notice_date: {
    type: DataTypes.DATE,
  },
  post_notice_date: {
    type: DataTypes.DATE,
  },
});

export default AdverseAction;
