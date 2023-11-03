import express from "express";
import { emailCheck, signin, signup } from "../controller/auth/auth.controller.js"
import dataJSON from "../utilities/dataJSON.js";

const router = express.Router();

router.route('/signin').post(signin)
router.route('/signup').post(signup)
router.route('/emailCheck').post(emailCheck)

router.use((req, res, next) => {
  res.status(404).json(dataJSON(404, 'URL or Method not found', 'The requested URL or Method does not exist.'));
});

export default router