import express, { NextFunction, Request, Response } from "express";
import Logic from "../Logic/Logic";
import upload from "../Logic/FileUpload";

//creating the router
const router = express.Router();

////Vacations/////

//adding a new vacation by admin
router.post(
  "/addVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = request.body;
    const result = await Logic.addVacation(newVacation);
    response.status(201).json({
      newVacation: result,
      vacationId: result.vacation_code,
      message: "Vacation added successfully",
    });
  }
);

//for upload an image
router.put(
  "/upload/:id",
  upload.single("image"),
  (request: Request, response: Response) => {
    response.send("image uploaded successfully");
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

router.get(
  "/likesPerVacation",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacations = await Logic.getLikesPerVacation();
    response.status(200).json(vacations);
  }
);

//get vacation by id
router.get(
  "/list/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.id;
    const vacation = await Logic.getVacationByCode(vacationId);
    response.status(200).json(vacation);
  }
);

///////users////////////

//adding a new user
router.post(
  "/addUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const result = await Logic.addUser(newUser);
    response.status(201).json(result);
  }
);

router.post(
  "/getUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const result = await Logic.getUser(newUser);
    response.status(200).json(result);
  }
);
router.post(
  "/getUserByEmail/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.params.email;
    const result = await Logic.getUserByEmail(email);
    response.status(200).json(result);
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
    const userId = +request.body.user_code;
    const vacationId = +request.body.vacation_code;
    const result = await Logic.toggleLike(userId, vacationId);
    response.status(201).json(result);
  }
);

router.post(
  "/getLikesByUser",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.body.user_code;

    const likes = await Logic.getLikesByUser(userId);
    response.status(200).json(likes);
  }
);

router.get(
  "/vacationFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    const result = await Logic.getLikesPerVacation();
    response.status(200).json(result);
  }
);

export default router;
