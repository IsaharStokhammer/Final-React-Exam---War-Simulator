import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Form, Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../store/features/UserSlice";
const useAppDispatch = () => useDispatch<AppDispatch>();


const RegisterPage = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [organization, setOrganization] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state: RootState) => state.user);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const result = await dispatch(registerUser({ userName, password ,organization}))
        // console.log(result.payload)
        // console.log(userName,password)
        if (result) {
            navigate("/login")
          
        }
      } catch (err) {
        console.error("regster failed:", err);
      }
    };
  
    return (
      <div className="login-container">
        <h2>register</h2>
        {status === "pending" && <p className="loading-message">Loading...</p>}
        {status === "rejected" && error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <select name="organization" id="organization"
         value={organization}
         onChange={(e) => setOrganization(e.target.value)}>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
          <option value="IDF">IDF</option>
        </select>
        {organization =="IDF"&& <select name="IDF" id="IDF" value={"IDF"} onChange={(e) => setOrganization(e.target.value)}>
          <option value="IDF - North">North</option>
          <option value="IDF - South">South</option>
          <option value="IDF - Center">Center</option>
          <option value="IDF - West Bank">West Bank</option>
        </select> }
          <button type="submit">Send</button>
          <p className="switch-auth">
            Have an account already? <Link to="/login">login here</Link>
          </p>
        </form>
      </div>
    );
  };
  


export default RegisterPage