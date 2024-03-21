import { Sequelize } from "sequelize";

const sequelize = new Sequelize("express_checkr", "root", "Harsha@076", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize