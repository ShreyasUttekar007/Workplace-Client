import React, { useEffect, useState } from "react";
import "../css/sidebar.css";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faHouse,
  faListUl,
  faPieChart,
  faPodcast,
  faSatelliteDish,
  faSignOutAlt,
  faUserPlus,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const logout = async () => {
    await localforage.removeItem("token");
    await localforage.removeItem("ID");
    await localforage.removeItem("email");
    navigate("/");
  };

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
    <div>
      <div
        className={`w3-sidebar w3-bar-block w3-card w3-animate-left ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="close-div">
          <button className="sidebar-close-button" onClick={closeSidebar}>
            Close &times;
          </button>
          <a href="/welcome" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon icon={faHouse} className="font-pdf2" size="1x" />
              Home
            </div>
          </a>
          <a href="/momdata" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faFolder}
                className="font-pdf2"
                size="1x"
              />
              MoM Dashboard
            </div>
          </a>

          <a href="/reportdata" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faFolder}
                className="font-pdf2"
                size="1x"
              />
              AC Report
            </div>
          </a>
          <a href="/idi-data" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faFolder}
                className="font-pdf2"
                size="1x"
              />
              IDI Report
            </div>
          </a>

          <a href="/booth-list" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faListUl}
                className="font-pdf2"
                size="1x"
              />
              Booth List
            </div>
          </a>
          <a href="/candidate-list" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faListUl}
                className="font-pdf2"
                size="1x"
              />
              Candidate List
            </div>
          </a>
          <a href="/media-scan" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faPodcast}
                className="font-pdf2"
                size="1x"
              />
              Media Scan
            </div>
          </a>
          <a href="/caste-dashboard" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faPieChart}
                className="font-pdf2"
                size="1x"
              />
              Caste Dashboard
            </div>
          </a>
          <a href="/state-dashboard" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faPieChart}
                className="font-pdf2"
                size="1x"
              />
              BI Dashboard
            </div>
          </a>
          {role !== "mod" &&
          role !== "state" &&
          email !== "rishabhsachdeav@showtimeconsulting.in" &&
          email !== "ashwinibambal@showtimeconsulting.in" &&
          email !== "bikash@showtimeconsulting.in" &&
          email !== "ashish@showtimeconsulting.in" &&
          email !== "shouvik@showtimeconsulting.in" &&
          email !== "aparnaj@showtimeconsulting.in" &&
          email !== "anirban@showtimeconsulting.in" &&
          email !== "abhishek.behara@showtimeconsulting.in" &&
          email !== "souvik.basak@showtimeconsulting.in"&&
          email !== "kiranponnoju@showtimeconsulting.in" ? null : (
            <a href="/survey-dashboard" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faPieChart}
                  className="font-pdf2"
                  size="1x"
                />
                Survey Dashboard
              </div>
            </a>
          )}
          {role !== "mod" &&
          email !== "prasad.p@showtimeconsulting.in" ? null : (
            <a href="/userdashboard" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faUsersLine}
                  className="font-pdf2"
                  size="1x"
                />
                User Data
              </div>
            </a>
          )}

          {role !== "mod" &&
          email !== "prasad.p@showtimeconsulting.in" ? null : (
            <a
              href="/nWuRGm1GvLXyCmQ6TbxqfQ7YasvDlY8z87TxUHrX0HUhX0Pxa9"
              className="w3-bar-item w3-button"
            >
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="font-pdf2"
                  size="1x"
                />
                Add User
              </div>
            </a>
          )}
          {role !== "mod" && role !== "soul" ? null : (
            <a href="/createMom" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faFile}
                  className="font-pdf2"
                  size="1x"
                />
                Add MoM
              </div>
            </a>
          )}
          {role !== "mod" &&
          email !== "sharvil.bhurke@showtimeconsulting.in" ? null : (
            <a href="/create-form17" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faFile}
                  className="font-pdf2"
                  size="1x"
                />
                Add Form-17
              </div>
            </a>
          )}
          {role !== "mod" &&
          email !== "sharvil.bhurke@showtimeconsulting.in" ? null : (
            <a href="/gatt-gann" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faFile}
                  className="font-pdf2"
                  size="1x"
                />
                Add Gatt-Gann
              </div>
            </a>
          )}
          {role !== "mod" &&
          role !== "soul" &&
          email !== "aditiambekar@showtimeconsulting.in" &&
          email !== "akash.jaywant@showtimeconsulting.in" &&
          email !== "pratikubale@showtimeconsulting.in" &&
          email !== "kaustavv.das@showtimeconsulting.in" &&
          email !== "mahimamishra@showtimeconsulting.in" ? null : (
            <a href="/createacreport" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faFile}
                  className="font-pdf2"
                  size="1x"
                />
                Add AC Report
              </div>
            </a>
          )}
          <a href="/create-media-scan" className="w3-bar-item w3-button">
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faSatelliteDish}
                className="font-pdf2"
                size="1x"
              />
              Add Media Scan
            </div>
          </a>

          {role !== "mod" &&
          role !== "soul" &&
          email !== "aditiambekar@showtimeconsulting.in" &&
          email !== "pratikubale@showtimeconsulting.in" &&
          email !== "akash.jaywant@showtimeconsulting.in" &&
          email !== "kaustavv.das@showtimeconsulting.in" &&
          email !== "mahimamishra@showtimeconsulting.in" ? null : (
            <a href="/create-idi" className="w3-bar-item w3-button">
              <div className="main-text-box">
                <FontAwesomeIcon
                  icon={faFile}
                  className="font-pdf2"
                  size="1x"
                />
                Add IDI Report
              </div>
            </a>
          )}

          <a href="/" className="w3-bar-item w3-button" onClick={logout}>
            <div className="main-text-box">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="font-pdf2"
                size="1x"
              />
              Logout
            </div>
          </a>
        </div>
      </div>

      <div id="main">
        <button id="openNav" className="sidebar-button" onClick={openSidebar}>
          &#9776;
        </button>
      </div>
    </div>
  );
};

export default SideBar;
