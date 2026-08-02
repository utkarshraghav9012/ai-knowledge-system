import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaBrain } from "react-icons/fa";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/users/login", { email, password });

      if (!response.data.token) {
        setError("Token not received");
        return;
      }

      login(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Login failed");
      } else {
        setError("Server not reachable");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow glow-one"></div>
      <div className="auth-glow glow-two"></div>

      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-icon"><FaBrain /></span>
          <h2>AI Knowledge Search</h2>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-sub">Login to continue to your dashboard.</p>

        <form onSubmit={handleLogin}>
          <div className="auth-field">
            <FaEnvelope className="auth-field-icon" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <FaLock className="auth-field-icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;