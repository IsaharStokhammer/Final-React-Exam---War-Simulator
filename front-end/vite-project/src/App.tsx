import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useSocket } from "./services/useSocket";
import AttackSocketPage from "./pages/sockets/AttackSocketPage";
import DefensePage from "./pages/defensePage/DefensePage";

function App() {


  
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/attackSocketPage" element={<AttackSocketPage/>} />
        <Route path="/defenseSocketPage" element={<DefensePage/>} />
      </Routes>
    </>
  );
}

export default App;
