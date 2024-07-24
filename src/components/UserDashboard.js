import React, { useState, useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import "../css/userDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "./Dashboard";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

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
      } catch (error) {
        console.error("Error fetching users:", error);
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
      const response = await axios.get("http://15.206.128.21:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td
                    style={{
                      maxWidth: "300px",
                    }}
                  >
                    {Array.isArray(user.roles)
                      ? user.roles.map((role, index) =>
                          index === user.roles.length - 1
                            ? capitalizeFirstLetter(role)
                            : capitalizeFirstLetter(role) + ", "
                        )
                      : capitalizeFirstLetter(user.roles)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      style={{
                        width: "fit-content",
                        backgroundColor: "red",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
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
