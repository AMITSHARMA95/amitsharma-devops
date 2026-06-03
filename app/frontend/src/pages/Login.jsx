import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("amit");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("userId", "1");
    navigate("/products");
  };

  return (
    <div className="page d-flex align-items-center justify-content-center">
      <div className="glass-card col-md-4 text-center">
        <h1 className="hero-title">Cloud Shop 🚀</h1>
        <p className="mb-4">Production Grade E-Commerce Platform</p>

        <input className="form-control my-3" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="form-control my-3" type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-main w-100 py-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
