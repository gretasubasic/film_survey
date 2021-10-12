import express from "express";
import { check } from "express-validator";
import { createSurvey, getSurveyData, getCreatedSurvey } from "../controllers/survey.js"

const router = express.Router();

router.get("/", getSurveyData);
router.post("/:id/answers", check("answer").notEmpty(), createSurvey)
router.get("/:id/answers", getCreatedSurvey)


export default router;