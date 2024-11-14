import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AttackPage from "./pages/attackPage/AttackPage";
import { useSocket } from "./services/useSocket";
import SocketPage from "./pages/sockets/socketPage";
import AttackSocketPage from "./pages/sockets/AttackSocketPage";

function App() {


  
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/attackPage" element={<AttackPage />} /> */}
        {/* <Route path="/socketPage" element={<SocketPage />} /> */}
        <Route path="/attackSocketPage" element={<AttackSocketPage/>} />
      </Routes>
    </>
  );
}

export default App;
