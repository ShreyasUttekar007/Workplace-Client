import React, { useState, useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import "../css/userDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const storedRole = await localforage.getItem("role");
        const token = await localforage.getItem("token");
        if (storedRole) {
          setRole(storedRole);

          if (storedRole === "admin") {
            const response = await axios.get(
              "http://15.206.128.21:5000/api/auth/users",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUsers(response.data);
          } else {
            console.log("You do not have permission to view all users.");
          }
        } else {
          console.log("Role not found in localforage.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await localforage.getItem("token");
      await axios.delete(`http://15.206.128.21:5000/api/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const handleUpdateUser = (userId) => {
    navigate(`/update-user/${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Dashboard />
      <h1>User Dashboard</h1>
      {role === "admin" ? (
        <div className="main-div">
          <table className="mom-table" style={{ width: "fit-content" }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td style={{ maxWidth: "300px" }}>
                    {Array.isArray(user.roles)
                      ? user.roles.map((role, index) =>
                          index === user.roles.length - 1
                            ? capitalizeFirstLetter(role)
                            : capitalizeFirstLetter(role) + ", "
                        )
                      : capitalizeFirstLetter(user.roles)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className="buttons-div">
                    <button
                      onClick={() => handleUpdateUser(user._id)}
                      style={{
                        width: "fit-content",
                        backgroundColor: "blue",
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      style={{
                        width: "fit-content",
                        backgroundColor: "red",
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        border: "none",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default UserDashboard;
