import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser"
import routes from "./routes/survey.js"
import dotenv from "dotenv"


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/api/v1/survey", routes);

app.get("/", (req, res) => {
    res.send("hello to survey api")
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {usenewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log("server running")))
.catch((error) => console.log(error))




 


console.log("listening on port 5000")