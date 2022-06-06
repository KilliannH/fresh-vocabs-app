import {BrowserRouter, Routes, Route, Router,} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
      <>
          <BrowserRouter>
              <NavbarComponent />
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/dashboard"} element={<DashboardPage />} />
                <Route path={"/"} element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
