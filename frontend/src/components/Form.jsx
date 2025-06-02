import { use, useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants.js";
import "../styles/Form.css"; // Assuming you have a CSS file for styling
import LoadingIndicator from "./LoadingIndicator.jsx";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
        const res = await api.post(route, {username, password})
        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            console.log(username, password);
            navigate("/");
        } else {
            navigate("/");
        }
    } catch (error) {
        alert(`An error occurred. Please try again. ${error.response ? error.response.data.detail : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      {!loading && <p className="form-message">Please enter your credentials</p>}
      <button className="form-button" type="submit">{name}</button>
    </form>
  );
}

export default Form;