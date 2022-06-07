import {BrowserRouter, Routes, Route,} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import NavbarComponent from "./components/NavbarComponent";
import './App.css';
import {useState} from "react";

function App() {
    const [token, setToken] = useState();

    // random user
    if(!token) {
        return (
            <>
                <BrowserRouter>
                    <NavbarComponent />
                    <Routes>
                        <Route path={"/login"} element={<LoginPage setToken={setToken} />} />
                        <Route path={"/"} element={<HomePage />} />
                        <Route
                            path="*"
                            element={<HomePage />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }

    // connected user
    return (
      <>
          <BrowserRouter>
              <NavbarComponent />
              <Routes>
                <Route path={"/home"} element={<HomePage />} />
                <Route path={"/dashboard"} element={<DashboardPage />} />
                <Route path={"/"} element={<HomePage />} />
                <Route
                      path="*"
                      element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </>
    );
}

export default App;
