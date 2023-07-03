import { travel } from "../../Redux/TravelStore";

export const userLoggedIn = () => {
  return travel.getState().users.isLoggedIn;
};

export function userIsAdmin(): boolean {
  const loggedIn = userLoggedIn();

  if (loggedIn) {
    const isAdmin = travel.getState().users.isAdmin;

    return isAdmin;
  } else {
    return false;
  }
}
