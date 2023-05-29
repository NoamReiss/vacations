//importation
import { Request, Response, NextFunction } from "express";
//error->model
import { RouteNotFoundError } from "../Models/Client-Errors";

//middleware function
const ErrorHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const err = new RouteNotFoundError(request.originalUrl);
  next(err);
};

export default ErrorHandler;
