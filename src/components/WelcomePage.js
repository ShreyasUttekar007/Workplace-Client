import React, { useState, useEffect } from "react";
import localforage from "localforage";
import "../css/welcomepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faPieChart,
  faPodcast,
  faSatelliteDish,
  faUserPlus,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import DashboardIDI from "./DashboardIDI";
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl";

const WelcomePage = () => {
  const [userName, setUserName] = useState("");
  const [userRoles, setUserRoles] = useState([]);
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");

  useEffect(() => {
    localforage.getItem("userName").then((name) => {
      if (name) {
        setUserName(name);
      }
    });

    localforage.getItem("roles").then((roles) => {
      if (roles) {
        setUserRoles(roles.map((role) => role.toUpperCase()));
      }
    });
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedRole = await localforage.getItem("role1");
        if (storedRole) {
          setRole(storedRole);
        } else {
          console.log("Role not found in localforage.");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = await localforage.getItem("email");
        if (storedEmail) {
          setEmail(storedEmail);
        } else {
          console.log("Email not found in localforage.");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };
    fetchUserEmail();
  }, []);

  return (
    <>
      <DashboardIDI />
      <div className="main-welcome">
        <h1 className="header">Welcome, {userName}!</h1>
      </div>
      <div className="buttons-container">
        <h2 className="head-text-welcome">Dashboard</h2>
        <div className="buttons">
          <a href="/momdata" className="menu-buttons">
            <FontAwesomeIcon icon={faFolder} className="font-pdf" size="3x" />
            MoM Dashboard
          </a>
          <a href="/reportdata" className="menu-buttons">
            <FontAwesomeIcon icon={faFolder} className="font-pdf" size="3x" />
            AC Report
          </a>
          <a href="/idi-data" className="menu-buttons">
            <FontAwesomeIcon icon={faFolder} className="font-pdf" size="3x" />
            IDI Dashboard
          </a>
          <a href="/caste-dashboard" className="menu-buttons">
            <FontAwesomeIcon icon={faPieChart} className="font-pdf" size="3x" />
            Caste Dashboard
          </a>
          <a href="/booth-list" className="menu-buttons">
            <FontAwesomeIcon icon={faListUl} className="font-pdf" size="3x" />
            Booth List
          </a>
          <a href="/media-scan" className="menu-buttons">
            <FontAwesomeIcon icon={faPodcast} className="font-pdf" size="3x" />
            Media Scan
          </a>
          <a href="/state-dashboard" className="menu-buttons">
            <FontAwesomeIcon icon={faPieChart} className="font-pdf" size="3x" />
            BI Dashboard
          </a>

          {role !== "mod" && role !== "state" ? null : (
            <a href="/survey-dashboard" className="menu-buttons">
              <FontAwesomeIcon
                icon={faPieChart}
                className="font-pdf"
                size="3x"
              />
              Survey Dashboard
            </a>
          )}
          {role !== "mod" ? null : (
            <a href="/userdashboard" className="menu-buttons">
              <FontAwesomeIcon
                icon={faUsersLine}
                className="font-pdf"
                size="3x"
              />
              User Data
            </a>
          )}
        </div>
        <h2 className="head-text-welcome">Upload Data</h2>
        <div className="buttons2">
          {role !== "mod" ? null : (
            <a
              href="/nWuRGm1GvLXyCmQ6TbxqfQ7YasvDlY8z87TxUHrX0HUhX0Pxa9"
              className="menu-buttons"
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="font-pdf"
                size="3x"
              />
              Add User
            </a>
          )}
          {role !== "mod" &&
          role !== "soul" &&
          email !== "hiteshideshmukh@showtimeconsulting.in" &&
          email !== "aditiambekar@showtimeconsulting.in" &&
          email !== "akash.jaywant@showtimeconsulting.in" &&
          email !== "pratikubale@showtimeconsulting.in" &&
          email !== "kaustavv.das@showtimeconsulting.in" &&
          email !== "mahimamishra@showtimeconsulting.in" ? null : (
            <a href="/createMom" className="menu-buttons">
              <FontAwesomeIcon icon={faFile} className="font-pdf" size="3x" />
              Add MoM
            </a>
          )}
          {role !== "mod" &&
          email !== "sharvil.bhurke@showtimeconsulting.in" ? null : (
            <a href="/create-form17" className="menu-buttons">
              <FontAwesomeIcon icon={faFile} className="font-pdf" size="3x" />
              Add Form-17
            </a>
          )}
          {role !== "mod" &&
          email !== "sharvil.bhurke@showtimeconsulting.in" ? null : (
            <a href="/gatt-gann" className="menu-buttons">
              <FontAwesomeIcon icon={faFile} className="font-pdf" size="3x" />
              Add Gatt-Gann
            </a>
          )}
          {role !== "mod" &&
          role !== "soul" &&
          email !== "hiteshideshmukh@showtimeconsulting.in" &&
          email !== "aditiambekar@showtimeconsulting.in" &&
          email !== "pratikubale@showtimeconsulting.in" &&
          email !== "akash.jaywant@showtimeconsulting.in" &&
          email !== "kaustavv.das@showtimeconsulting.in" &&
          email !== "mahimamishra@showtimeconsulting.in" ? null : (
            <a href="/createacreport" className="menu-buttons">
              <FontAwesomeIcon icon={faFile} className="font-pdf" size="3x" />
              Add AC Report
            </a>
          )}
          <a href="/create-media-scan" className="menu-buttons">
            <FontAwesomeIcon
              icon={faSatelliteDish}
              className="font-pdf"
              size="3x"
            />
            Add Media Scan
          </a>
          {role !== "mod" &&
          role !== "soul" &&
          email !== "hiteshideshmukh@showtimeconsulting.in" &&
          email !== "aditiambekar@showtimeconsulting.in" &&
          email !== "pratikubale@showtimeconsulting.in" &&
          email !== "akash.jaywant@showtimeconsulting.in" &&
          email !== "kaustavv.das@showtimeconsulting.in" &&
          email !== "mahimamishra@showtimeconsulting.in" ? null : (
            <a href="/create-idi" className="menu-buttons">
              <FontAwesomeIcon icon={faFile} className="font-pdf" size="3x" />
              Add IDI Report
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
