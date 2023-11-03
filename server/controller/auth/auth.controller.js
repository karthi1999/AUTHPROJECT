import { createUser, loginUser, verifyEmail } from "../../service/auth.service.js";
import dataJSON from "../../utilities/dataJSON.js";

// DESC     check email
// Route    POST /emailCheck
const emailCheck = async (req, res, next) => {
  try {
    const { status, description, message, data } = await verifyEmail(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
}

// DESC     create user
// Route    POST /signup
const signup = async (req, res, next) => {
  try {
    const { status, description, message, data } = await createUser(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

// DESC     login user
// Route    POST /signin
const signin = async (req, res, next) => {
  try {
    const { status, description, message, data } = await loginUser(req.body);
    return res.status(200).json(dataJSON(status, description, message, data));
  } catch (error) {
    next(error);
  }
};

export {
  signup,
  signin,
  emailCheck
}