import MainRoutes from "../../Routes/MainRoutes/MainRoutes";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import "./MainLayout.css";

function MainLayout(): JSX.Element {
  return (
    <div className="MainLayout">
      <header>
        <Header />
      </header>
      <main>
        <MainRoutes />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
