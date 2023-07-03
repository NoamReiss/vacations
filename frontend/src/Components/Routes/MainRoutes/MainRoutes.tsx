import "./MainRoutes.css";

import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import MainPage from "../../Pages/MainPage/MainPage";
import { PrivateRoutes, AdminRoutes } from "../../Utils/ProtectedRoutes";
import EditVacation from "../../Pages/EditVacation/EditVacation";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import Reports from "../../Pages/Reports/Reports";

function MainRoutes(): JSX.Element {
  return (
    <div className="MainRoutes">
      <Routes>
        <Route element={<PrivateRoutes />}>
          {" "}
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/editVacation/:id" element={<EditVacation />} />
          <Route path="/addVacation" element={<AddVacation />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
