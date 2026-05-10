import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({
    path: "./.env"
})
let app = express();

// basic configurations

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this  is to accept data which has different kinds of formatting, like usage of %20% for spaces, etc
app.use(express.static("public")); // this is to keep the assets of the public folder available to everyone
app.use(cookieParser());
// cors configuration

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(","),
    credentials: true, // cookies
    methods: ["GET", "POST", 'OPTIONS', "DELETE", "PUT", "PATCH"],
    allowedHeaders: ['Content-type', 'Authorization']
    }));

// after config we will check the health
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import notesRouter from "./routes/notes.routes.js"

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/projects/:projectId/tasks", taskRouter);
app.use("/api/v1/projects/:projectId/notes", notesRouter);


app.get("/newapage");
// app.get("/newpage", (req, res) => {
//     res.send(webpage);
//     const data = {reg_no: '24/099', std_name: 'Dhyanelia', univ_roll: '12200122051', dept: 'IT'};
//     // const data = ['24/022','Dhyaalia', '12200132059', 'AIML'];
//     const result = (async() => await dataEntryGuy(data))();
//     console.log(result);
// });

app.get("/", (req, res) => {
    res.send("Start of the homepage");
});

export default app;