import { signupService, loginService } from "./auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(JSON.stringify(err));
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginService(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};