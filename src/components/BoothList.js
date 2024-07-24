import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import localforage from "localforage";
import "../css/momData.css";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Dashboard from "./Dashboard";
import data from "../dataFile.json";
import ReactPaginate from "react-paginate";
import DashboardReport from "./DashboardReport";
import ReactToPrint from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const BoothList = () => {
  const [momData, setMomData] = useState([]);
  const [responseAllMomCount, setResponseAllMomCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoneCount, setZoneCount] = useState(0);
  const [pcCount, setPcCount] = useState(0);
  const [acCount, setAcCount] = useState(0);
  const [partyCounts, setPartyCounts] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [role, setRole] = useState("");
  const initialDropdownValue = "";
  const [searchInput, setSearchInput] = useState("");
  const [filteredMomData, setFilteredMomData] = useState([]);

  const [selectedPc, setSelectedPc] = useState(initialDropdownValue);
  const [selectedConstituency, setSelectedConstituency] =
    useState(initialDropdownValue);
  const [selectedZone, setSelectedZone] = useState(initialDropdownValue);
  const navigate = useNavigate();
  const componentRef = useRef();

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "desc",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  //   const itemsPerPage = 10;

  //   const pageCount = Math.ceil(filteredMomData.length / itemsPerPage);

  //   const displayedMomData = useMemo(() => {
  //     const startIndex = currentPage * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;
  //     return filteredMomData.slice(startIndex, endIndex);
  //   }, [currentPage, filteredMomData]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
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

  const filterMomDataByDateRange = (start, end) => {
    const filteredMomDataByDate = momData.filter(
      (mom) => new Date(mom.dom) >= start && new Date(mom.dom) <= end
    );

    setFilteredMomData(filteredMomDataByDate);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSort = (key) => {
    requestSort(key);
    const sortedFilteredMomData = [...filteredMomData].sort((a, b) => {
      const valA = a[key].toUpperCase();
      const valB = b[key].toUpperCase();

      if (sortConfig.direction === "asc") {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
    setFilteredMomData(sortedFilteredMomData);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    const filteredAndSortedData = sortedMomData.filter((mom) => {
      const tagsMatch = mom.tags.some((tag) =>
        tag.toLowerCase().includes(input.toLowerCase())
      );

      return (
        mom.constituency.toLowerCase().includes(input.toLowerCase()) ||
        mom.district.toLowerCase().includes(input.toLowerCase()) ||
        mom.pc.toLowerCase().includes(input.toLowerCase()) ||
        tagsMatch
      );
    });

    setFilteredMomData(
      [...filteredAndSortedData].sort((a, b) => {
        if (sortConfig.key) {
          const valA = a[sortConfig.key].toUpperCase();
          const valB = b[sortConfig.key].toUpperCase();

          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return 0;
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await localforage.getItem("token");
        const userId = await localforage.getItem("ID");
        const partyNames = [
          "Shivsena",
          "BJP",
          "UBT",
          "NCP(AP)",
          "NCP(SP)",
          "INC",
          "MNS",
          "Other Party",
          "NA",
        ];

        const role = await localforage.getItem("role");
        setUserRole(role);

        const momDataResponse = await axios.get(
          `http://15.206.128.21:5000/api/booth/get-report/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedMomData = momDataResponse.data.sort((a, b) => {
          if (a.pc < b.pc) return -1;
          if (a.pc > b.pc) return 1;
          if (a.constituency < b.constituency) return -1;
          if (a.constituency > b.constituency) return 1;
          return 0;
        });

        setMomData(sortedMomData);
        setFilteredMomData(sortedMomData);
        const momDataForAllParties = partyNames.map((partyName) => {
          const momCount = sortedMomData.filter(
            (mom) => mom.partyName === partyName
          ).length;
          return {
            partyName,
            momCount,
          };
        });

        setPartyCounts(momDataForAllParties);
        setResponseAllMomCount(sortedMomData.length);
        setLoading(false);

        const uniquePc = [...new Set(sortedMomData.map((mom) => mom.pc))];
        const uniqueAc = [
          ...new Set(sortedMomData.map((mom) => mom.constituency)),
        ];
        const uniqueZone = [...new Set(sortedMomData.map((mom) => mom.zone))];
        setDropdownData({
          ...dropdownData,
          pc: uniquePc,
          ac: uniqueAc,
          zone: uniqueZone,
        });
      } catch (error) {
        console.error("Error fetching mom data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortConfig]);

  const fetchZoneCount = async () => {
    try {
      const token = await localforage.getItem("token");

      if (selectedZone === initialDropdownValue) {
        // Set count to 0 or handle accordingly
        console.log("Selected zone is not valid");
        setZoneCount(0);
      } else {
        const responseZoneCount = await axios.get(
          `http://15.206.128.21:5000/api/moms/get-mom-count-by-zone/${selectedZone}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setZoneCount(responseZoneCount.data.momCount);
      }
    } catch (error) {
      console.error("Error fetching zone count:", error);
    }
  };

  useEffect(() => {
    fetchZoneCount();
  }, [selectedZone]);

  const fetchPcCount = async () => {
    try {
      const token = await localforage.getItem("token");

      if (selectedPc === initialDropdownValue) {
        // Set count to 0 or handle accordingly
        console.log("Selected pc is not valid");
        setPcCount(0);
      } else {
        const responsePcCount = await axios.get(
          `http://15.206.128.21:5000/api/moms/get-mom-count-by-pc/${selectedPc}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPcCount(responsePcCount.data.momCount);
      }
    } catch (error) {
      console.error("Error fetching zone count:", error);
    }
  };

  useEffect(() => {
    fetchPcCount();
  }, [selectedPc]);

  const fetchAcCount = async () => {
    try {
      const token = await localforage.getItem("token");

      if (selectedConstituency === initialDropdownValue) {
        // Set count to 0 or handle accordingly
        console.log("Selected ac is not valid");
        setAcCount(0);
      } else {
        const responseAcCount = await axios.get(
          `http://15.206.128.21:5000/api/moms/get-mom-count-by-constituency/${selectedConstituency}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAcCount(responseAcCount.data.momCount);
      }
    } catch (error) {
      console.error("Error fetching zone count:", error);
    }
  };

  useEffect(() => {
    fetchAcCount();
  }, [selectedConstituency]);

  const sortedMomData = useMemo(() => {
    let sortableMomData = [...momData];
    if (sortConfig.key) {
      sortableMomData.sort((a, b) => {
        if (sortConfig.key === "dom" || sortConfig.key === "createdAt") {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);

          if (sortConfig.direction === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        } else {
          const valA = a[sortConfig.key].toUpperCase();
          const valB = b[sortConfig.key].toUpperCase();

          if (sortConfig.direction === "asc") {
            return valA.localeCompare(valB);
          } else {
            return valB.localeCompare(valA);
          }
        }
      });
    }
    return sortableMomData;
  }, [momData, sortConfig]);

  const [dropdownData, setDropdownData] = useState({
    pc: [],
    zone: [],
    districts: [],
    ac: [],
  });

  useEffect(() => {
    const uniqueZone = [...new Set(data.map((item) => item["Zone"]))];
    const uniqueDistricts = [...new Set(data.map((item) => item["District"]))];
    const uniquePc = [
      ...new Set(data.map((item) => item["Pc Name and Number"])),
    ];
    const uniqueAc = [
      ...new Set(data.map((item) => item["Ac Name and Number"])),
    ];

    setDropdownData({
      zone: uniqueZone,
      districts: uniqueDistricts,
      pc: uniquePc,
      ac: uniqueAc,
    });
  }, []);

  const handlePcChange = (e) => {
    const selectedPc = e.target.value;

    const filteredAc = data
      .filter((item) => item["Pc Name and Number"] === selectedPc)
      .map((item) => item["Ac Name and Number"]);

    setDropdownData({
      ...dropdownData,
      ac: [...new Set(filteredAc)],
    });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setMomData([]);

    if (name === "pc") {
      try {
        const token = await localforage.getItem("token");

        if (value === initialDropdownValue) {
          setFilteredMomData(sortedMomData);
        } else {
          const responseMomByPC = await axios.get(
            `http://15.206.128.21:5000/api/booth/get-report-by-pc/${value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setMomData(responseMomByPC.data.moms);
          setFilteredMomData(responseMomByPC.data.moms);
        }
      } catch (error) {
        console.error("Error fetching mom data by PC:", error);
      }
    } else if (name === "constituency") {
      try {
        const token = await localforage.getItem("token");

        if (value === initialDropdownValue) {
          setFilteredMomData(sortedMomData);
        } else {
          const responseMomByConstituency = await axios.get(
            `http://15.206.128.21:5000/api/booth/get-report-by-constituency/${value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setMomData(responseMomByConstituency.data.moms);
          setFilteredMomData(responseMomByConstituency.data.moms);
        }
      } catch (error) {
        console.error("Error fetching booth data by constituency:", error);
      }
    } else if (name === "zone") {
      try {
        const token = await localforage.getItem("token");

        if (value === initialDropdownValue) {
          setFilteredMomData(sortedMomData);
        } else {
          const responseMomByZone = await axios.get(
            `http://15.206.128.21:5000/api/booth/get-report-by-zone/${value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setMomData(responseMomByZone.data.moms);
          setFilteredMomData(responseMomByZone.data.moms);
        }
      } catch (error) {
        console.error("Error fetching booth data by zone:", error);
      }
    }
  };

  const handleDeleteMom = async (momId) => {
    try {
      const token = await localforage.getItem("token");
      await axios.delete(
        `http://15.206.128.21:5000/api/booth/delete-report/${momId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedMomData = momData.filter((mom) => mom._id !== momId);
      setMomData(updatedMomData);
      setFilteredMomData(updatedMomData);
      window.alert("booth is deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting mom:", error);
    }
  };

  const formatIndianDate = (date) => {
    if (!date) return "";

    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };

    return date.toLocaleDateString("en-IN", options);
  };

  const allowedRoles = [
    "admin",
    "mod",
    "Eastern Vidarbha",
    "Konkan",
    "Marathwada",
    "Mumbai",
    "Northern Maharashtra",
    "Thane + Palghar",
    "Western Maharashtra",
    "Western Vidarbha",
  ];

  const isRoleAllowed = allowedRoles.includes(role);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <DashboardReport />
      <div className="mom-container">
        {loading ? (
          <div>
            <BeatLoader color="#03b3ff" className="loader" />
          </div>
        ) : momData.length === 0 ? (
          <div>
            <p>No MOM data available.</p>
          </div>
        ) : (
          <>
            <div className="mom-count">
              <div className="all-container">
                <div
                  className="select-columns"
                  style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
                >
                  <label>
                    Zone
                    <select
                      name="zone"
                      value={selectedZone}
                      onChange={(e) => {
                        setSelectedZone(e.target.value);
                        handleInputChange(e);
                      }}
                      style={{ margin: "5px" }}
                      disabled={!isRoleAllowed}
                    >
                      <option value={initialDropdownValue}>Select Zone</option>
                      {dropdownData.zone.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Assembly Constituency
                    <select
                      name="constituency"
                      value={selectedConstituency}
                      onChange={(e) => {
                        setSelectedConstituency(e.target.value);
                        handleInputChange(e);
                      }}
                      style={{ margin: "5px" }}
                    >
                      <option value={initialDropdownValue}>Select AC</option>
                      {dropdownData.ac
                        .sort((a, b) => {
                          // Extract the constituency names from "number-name" format
                          const nameA = a.split("-")[1].trim();
                          const nameB = b.split("-")[1].trim();
                          // Compare and sort alphabetically
                          return nameA.localeCompare(nameB);
                        })
                        .map((assembly) => (
                          <option key={assembly} value={assembly}>
                            {assembly}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className="export-button">
                  <ReactToPrint
                    trigger={() => (
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className="font-pdf"
                        size="2x"
                      />
                    )}
                    content={() => componentRef.current}
                    pageStyle={`@page { margin: 5mm 10mm; }`}
                    documentTitle="Booth List"
                    removeAfterPrint={true}
                  />
                </div>
              </div>
              <div
                className="select-columns"
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  fontSize: "20px",
                }}
              ></div>
            </div>
            {selectedConstituency !== initialDropdownValue && (
              <div class="table-container" id="pdf-content" ref={componentRef}>
                <h2 style={{ textAlign: "center" }}>
                  {capitalizeWords(selectedConstituency)}
                </h2>
                <table className="mom-table">
                  <thead>
                    <tr>
                      <th
                        onClick={() => requestSort("constituency")}
                        className={getClassNamesFor("constituency")}
                        style={{ textAlign: "center" }}
                      >
                        Booth{" "}
                        {getClassNamesFor("constituency") === "asc" && "↑"}
                        {getClassNamesFor("constituency") === "desc" && "↓"}
                      </th>
                      <th
                        onClick={() => requestSort("leaderName")}
                        className={getClassNamesFor("leaderName")}
                        style={{ textAlign: "center", maxWidth: "400px" }}
                      >
                        Address{" "}
                        {getClassNamesFor("leaderName") === "asc" && "↑"}
                        {getClassNamesFor("leaderName") === "desc" && "↓"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMomData.map((mom) => (
                      <tr key={mom.id}>
                        <td>{mom.booth}</td>
                        <td style={{ maxWidth: "400px" }}>{mom.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BoothList;
