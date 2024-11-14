import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/features/UserSlice";
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
      const result = await dispatch(registerUser({ userName, password, organization }));
      if (result) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {status === "pending" && <p className="loading-message">Loading...</p>}
      {status === "rejected" && error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          className="input-field"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <select
          name="organization"
          id="organization"
          className="select-field"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
          <option value="IDF">IDF</option>
        </select>
        {organization === "IDF" && (
          <select
            name="IDF"
            id="IDF"
            className="select-field"
            value="IDF"
            onChange={(e) => setOrganization(e.target.value)}
          >
            <option value="IDF - North">North</option>
            <option value="IDF - South">South</option>
            <option value="IDF - Center">Center</option>
            <option value="IDF - West Bank">West Bank</option>
          </select>
        )}
        <button type="submit" className="submit-button">Send</button>
        <p className="switch-auth">
          Have an account already? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
