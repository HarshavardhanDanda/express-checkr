import express from 'express'
import sequelize from './database/db';
import AdminRouter from "./routes/AdminRoutes";
import candidateRouter from './routes/CandidateRoutes';

const app = express();

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database sync successful");
    app.listen(8080, () => {
      console.log(`Server is running on http://localhost:8080`);
    });
  })
  .catch((error: any) => {
    console.error("Something went wrong while syncing database:", error);
  });

app.use("/admin", AdminRouter);
app.use("/candidate", candidateRouter);