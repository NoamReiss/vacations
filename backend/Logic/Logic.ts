import Vacation from "../Models/Vacation";
import User from "../Models/User";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import Follower from "../Models/Follower";
import { Request, Response, response } from "express";
import { deleteImage } from "./FileUpload";
//format date for mySQL date type
const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};

const addVacation = async (newVacation: Vacation) => {
  const SQLcommand = `INSERT INTO travel.vacations (destination,description,start_date,end_date,price,file_img_name) VALUES ('${
    newVacation.destination
  }','${newVacation.description}','${formatDate(
    newVacation.start_date
  )}','${formatDate(newVacation.end_date)}','${newVacation.price}','${
    newVacation.file_img_name
  }');`;
  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return new Vacation(
    result.insertId,
    newVacation.destination,
    newVacation.description,
    newVacation.start_date,
    newVacation.end_date,
    newVacation.price,
    newVacation.file_img_name,
    newVacation.likes
  );
};

const createVacationTable = () => {
  const SQLcommand = `CREATE TABLE IF NOT EXISTS travel.vacations (
    vacation_code INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(45) NULL,
    description VARCHAR(255) NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    price INT NULL,
    file_img_name VARCHAR(255) NULL,
    likes INT NULL default 0,
    PRIMARY KEY (vacation_code));`;
  const response = dal_mysql.execute(SQLcommand);
};

const createUserTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS travel.users (
        user_code INT NOT NULL AUTO_INCREMENT,
        private_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        password VARCHAR(45) NOT NULL,
        isAdmin BOOLEAN default false,
        likedVacations  JSON NULL ,
        PRIMARY KEY (user_code));
        `;
  const response = dal_mysql.execute(SQLcommand);
};

const createFollowersTable = () => {
  const SQLcommand = `
      CREATE TABLE IF NOT EXISTS travel.followers (
        id INT NOT NULL AUTO_INCREMENT,
        user_code INTEGER NOT NULL,
         vacation_code INTEGER NOT NULL,
         FOREIGN KEY(user_code) REFERENCES users(user_code),
         FOREIGN KEY(vacation_code) REFERENCES vacations(vacation_code),
        
        PRIMARY KEY (id));
        `;
  const response = dal_mysql.execute(SQLcommand);
};

const updateVacation = async (vacation: Vacation) => {
  const SQLcommands = `
    UPDATE
    travel.vacations
    SET destination = '${vacation.destination}', description = '${
    vacation.description
  }', start_date = '${formatDate(
    vacation.start_date
  )}', end_date = '${formatDate(vacation.end_date)}',price = '${
    vacation.price
  }', file_img_name = '${vacation.file_img_name}'
    WHERE
    (vacation_code = '${vacation.vacation_code}');
    `;
  await dal_mysql.execute(SQLcommands);
  return true;
};

const deleteVacation = async (vacation_code: number) => {
  const checkLikes = `SELECT likes FROM travel.vacations WHERE vacation_code = ${vacation_code}`;
  const likeResult: { likes: number }[] = await dal_mysql.execute(checkLikes);
  const likesCount = likeResult[0].likes;

  if (likesCount > 0) {
    const deleteLikes = `DELETE FROM followers
    WHERE vacation_code = ${vacation_code}`;
    await dal_mysql.execute(deleteLikes);
  }
  const deleteSql = `DELETE FROM travel.vacations WHERE vacation_code = ${vacation_code}`;
  await dal_mysql.execute(deleteSql);

  await deleteImage(vacation_code);
};

const getVacationByCode = async (vacation_code: number) => {
  return await dal_mysql.execute(
    `SELECT * ,
    CONVERT_TZ(start_date, '+00:00', @@session.time_zone) AS start_date,
            CONVERT_TZ(end_date, '+00:00', @@session.time_zone) AS end_date
    FROM travel.vacations WHERE vacation_code =${vacation_code}`
  );
};

const getAllVacations = async () => {
  const SQLcommand = `SELECT * FROM travel.vacations ORDER BY start_date`;
  return await dal_mysql.execute(SQLcommand);
};

//users
const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO travel.users 
    (private_name,last_name,email,password) 
    VALUES 
    ('${newUser.private_name}','${newUser.last_name}','${newUser.email}','${newUser.password}');
    `;

  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};

const getUser = async (newUser: User): Promise<User | null> => {
  const sql = `SELECT * FROM travel.users WHERE email ="${newUser.email}" AND password ="${newUser.password}"`;
  const [userData] = await dal_mysql.execute(sql);
  if (!userData) {
    return null;
  }
  return userData ? userData : null;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const sql = `SELECT * FROM travel.users WHERE email = '${email}'`;
  const [userData] = await dal_mysql.execute(sql);
  if (!userData) {
    return null;
  }
  return userData ? { ...userData, isAdmin: userData.isAdmin } : null;
};

//follower

const toggleLike = async (userId: number, vacationId: number) => {
  const userSql = `
    SELECT likedVacations
    FROM users
    WHERE user_code = "${userId}"
  `;
  const userResult: { likedVacations: string }[] = await dal_mysql.execute(
    userSql
  );
  const currentLikedVacations: number[] = userResult[0].likedVacations
    ? JSON.parse(userResult[0].likedVacations)
    : [];

  if (currentLikedVacations.includes(vacationId)) {
    // Remove the like

    const index = currentLikedVacations.indexOf(vacationId);
    currentLikedVacations.splice(index, 1);

    const removeLikeSql = `
      DELETE FROM followers
      WHERE vacation_code = "${vacationId}" AND user_code = "${userId}"
    `;
    await dal_mysql.execute(removeLikeSql);

    const updateVacationSql = `
      UPDATE vacations
      SET likes= likes - 1
      WHERE vacation_code = "${vacationId}"
    `;
    await dal_mysql.execute(updateVacationSql);
  } else {
    // Add the like

    currentLikedVacations.push(vacationId);

    const addLikeSql = `
      INSERT INTO followers (vacation_code, user_code)
      VALUES ("${vacationId}","${userId}")
    `;
    await dal_mysql.execute(addLikeSql);

    const updateVacationSql = `
      UPDATE vacations
      SET likes = likes + 1
      WHERE vacation_code = "${vacationId}"
    `;
    await dal_mysql.execute(updateVacationSql);
  }

  const updateLikedVacationsSql = `
    UPDATE users
    SET likedVacations = "${JSON.stringify(currentLikedVacations)}"
    WHERE user_code = "${userId}"
  `;
  await dal_mysql.execute(updateLikedVacationsSql);
};

const getLikesByUser = async (userId: number) => {
  const sql = `
      SELECT vacations.vacation_code
      FROM vacations.followers
      INNER JOIN travel.vacations ON followers.vacation_code = vacations.vacation_code
      WHERE followers.user_code = "${userId}" 
    `;
  const result: Vacation[] = await dal_mysql.execute(sql);
  return result;
};

const getLikesPerVacation = async () => {
  const sql = `
      SELECT destination, likes
      FROM travel.vacations
    `;
  const result: any = await dal_mysql.execute(sql);
  return result;
};

export default {
  createVacationTable,
  createUserTable,
  addVacation,
  deleteVacation,
  getVacationByCode,
  getAllVacations,
  addUser,

  updateVacation,
  createFollowersTable,
  getUserByEmail,
  getUser,
  toggleLike,
  getLikesByUser,
  getLikesPerVacation,
};
