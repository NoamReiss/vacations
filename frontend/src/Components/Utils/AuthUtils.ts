import { travel } from "../../Redux/TravelStore";

export const userLoggedIn = () => {
  return travel.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();

  if (loggedIn) {
    const user = travel.getState().users.users[0];

    return user.isAdmin;
  } else {
    return false;
  }
}
