import express, { NextFunction, Request, Response } from "express";
import Logic from "../Logic/Logic";

//creating the router
const router = express.Router();

////Vacations/////

//adding a new vacation by admin
router.post(
  "/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    const result = await Logic.addVacation(newVacation);
    response.status(201).json(result);
  }
);

// deleting a vacation by vacation_code by admin
router.delete(
  "/deleteVacation/:vacation_code",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.vacation_code;
    Logic.deleteVacation(vacationCode);
    response.status(204).json();
  }
);

// updating a an existing vacation by vacation_code by admin
router.put(
  "/updateVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedVacation = request.body;
    await Logic.updateVacation(updatedVacation);
    response.status(202).json();
  }
);

//get all the vacations
router.get(
  "/vacationList",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getAllVacations();
    response.status(200).json(result);
  }
);

///////users////////////

// get all the users
router.get(
  "/userList",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getAllUsers();
    response.status(200).json(result);
  }
);

//adding a new user
router.post(
  "/addUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const result = await Logic.addUser(newUser);
    response.status(201).json(result);
  }
);

//check if the main page works
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("Controller working !!!");
  }
);

//follower

router.post(
  "/addFollower",
  async (request: Request, response: Response, next: NextFunction) => {
    const newFollower = request.body;
    const result = await Logic.addFollower(newFollower);
    response.status(201).json(result);
  }
);

router.delete(
  "/deleteFollower/:user_code",
  async (request: Request, response: Response, next: NextFunction) => {
    const userCode = +request.params.user_code;
    Logic.deleteVacation(userCode);
    response.status(204).json();
  }
);

router.get(
  "/vacationFollowers/:vacation_code",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationCode = +request.params.vacation_code;
    const result = await Logic.getFollowersByVacationCode(vacationCode);
    response.status(204).json(result);
  }
);

export default router;
