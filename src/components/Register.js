import axios from "axios";
import { useState } from "react";
import "../css/login.css";
import img from "../STC_logo-01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRoleChange = (role) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post(
        "http://15.206.128.21:5000/api/auth/signup",
        {
          userName,
          email,
          password,
          roles,
        }
      );

      // Reset form fields
      setUserName("");
      setEmail("");
      setPassword("");
      setRoles([]);
      
      // Show success alert
      alert("Sign Up successful!");

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Sign Up failed. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login" style={{ width: "500px", margin: "50px" }}>
        <img src={img} className="img" alt="STC Logo" />
        <h1>Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} style={{ alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{ width: "350px" }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "350px" }}
          />
          <div
            className="password-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              marginBottom: "20px",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "350px" }}
            />
            <div
              className="eye-icon"
              onClick={toggleShowPassword}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>
          <div
            className="roles"
            style={{ display: "flex", width: "560px", flexWrap: "wrap" }}
          >
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="admin"
                onChange={() => handleRoleChange("admin")}
              />
              Admin
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="user"
                onChange={() => handleRoleChange("user")}
              />
              User
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Eastern Vidarbha"
                onChange={() => handleRoleChange("Eastern Vidarbha")}
              />
              Eastern Vidarbha
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Konkan"
                onChange={() => handleRoleChange("Konkan")}
              />
              Konkan
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Marathwada"
                onChange={() => handleRoleChange("Marathwada")}
              />
              Marathwada
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Mumbai"
                onChange={() => handleRoleChange("Mumbai")}
              />
              Mumbai
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Northern Maharashtra"
                onChange={() => handleRoleChange("Northern Maharashtra")}
              />
              Northern Maharashtra
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Thane + Palghar"
                onChange={() => handleRoleChange("Thane + Palghar")}
              />
              Thane + Palghar
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Western Maharashtra"
                onChange={() => handleRoleChange("Western Maharashtra")}
              />
              Western Maharashtra
            </label>
            <label style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                value="Western Vidarbha"
                onChange={() => handleRoleChange("Western Vidarbha")}
              />
              Western Vidarbha
            </label>
          </div>
          <div className="bttn">
            <button type="submit" className="button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
