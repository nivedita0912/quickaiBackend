import express from "express";
import { auth } from '../middlewares/Auth.js'
import { generateArticle } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/generateArticle',  auth , generateArticle);

export default aiRouter