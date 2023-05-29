import { NavLink } from "react-router-dom";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default Main;
