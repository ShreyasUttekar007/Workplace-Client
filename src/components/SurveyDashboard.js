import React, { useState, useEffect } from "react";
import DashboardReport from "./DashboardReport";
import localforage from "localforage";

const Card = ({ imageSrc, title, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        padding: "20px",
        margin: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "16px",
          background: "#fff",
        }}
      >
        <h2
          style={{
            margin: "0",
            fontSize: "26px",
            textAlign: "center",
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

const SurveyDashboard = () => {
  const [iframeSrc, setIframeSrc] = useState("");
  const [email, setEmail] = useState("");
  const [dashboardLinks, setDashboardLinks] = useState([]);

  useEffect(() => {
    // Fetch the email from localforage
    localforage.getItem("email").then((value) => {
      if (value) {
        setEmail(value);
        // Set the dashboards based on the email
        const dashboards = getDashboardLinksForEmail(value);
        setDashboardLinks(dashboards);
      }
    });
  }, []);

  const getDashboardLinksForEmail = (email) => {
    const dashboardLinksWithUsers = [
      {
        title: "Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMThmNGMwZDctMDU2MS00N2JkLWIyNDgtYjBmMDg4NDNiZmFlIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "samarth@showtimeconsulting.in",
          "anuragsaxena@showtimeconsulting.in",
          "at@showtimeconsulting.in",
        ],
      },
      {
        title: "Mumbai Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMGJjNDQxOWQtOTZiOS00MzI1LTkwYmMtZDQ0NjQxZGI2NTAyIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "aparnaj@showtimeconsulting.in",
          "shouvik@showtimeconsulting.in",
          "rishabhsachdeva@showtimeconsulting.in",
        ],
      },
      {
        title: "Thane Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZWQ1Y2M2NzAtNzY1MS00NzYwLWI5ZTQtZjA4ZWRjODYzMDkxIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "anirban@showtimeconsulting.in",
          "praveenkumar@showtimeconsulting.in",
        ],
      },
      {
        title: "Vidharbha Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiYThlZGFkN2MtMGIxOS00YWMxLThkNDEtNDczNGJmZTliOTg0IiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "souvik.basak@showtimeconsulting.in",
          "siddharthag@showtimeconsulting.in",
        ],
      },
      {
        title: "Northern-MH Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZjAyZWIwZjYtNWFlYS00NDU3LWFmYmUtYjYxYzU5MDg4ZDljIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "abhishek.behara@showtimeconsulting.in",
          "ashwinibambal@showtimeconsulting.in",
          "praveenkumar@showtimeconsulting.in",
        ],
      },
      {
        title: "Marathwada Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNWY1N2RmNTEtNTYxMi00NzQyLWI3ZGUtMmQ5MDgxNTM3ODg4IiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: [
          "bikash@showtimeconsulting.in",
          "siddharthag@showtimeconsulting.in",
        ],
      },
      {
        title: "Western-MH Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNTc2ZGNjOTktZDMwMC00ODcxLWI5MGYtM2I5ZDMxZjJmMjY5IiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: ["ashish@showtimeconsulting.in"],
      },
      {
        title: "Konkan Assembly Survey",
        imageSrc: "https://www.scnsoft.com/images-for-demo/power-bi.png",
        link: "https://app.powerbi.com/view?r=eyJrIjoiYmViOTVmOTMtMjI1Ny00MWQ2LWFkMTgtZDRjYWQzNjUwN2UyIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9",
        users: ["praveenkumar@showtimeconsulting.in", "kiranponnoju@showtimeconsulting.in"],
      },
    ];

    return dashboardLinksWithUsers.filter((dashboard) =>
      dashboard.users.includes(email)
    );
  };

  const handleCardClick = (link) => {
    setIframeSrc(link);
  };

  return (
    <div>
      <DashboardReport />
      {!iframeSrc ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
            flexWrap: "wrap",
          }}
        >
          {dashboardLinks.map((dashboard, index) => (
            <Card
              key={index}
              imageSrc={dashboard.imageSrc}
              title={dashboard.title}
              onCardClick={() => handleCardClick(dashboard.link)}
            />
          ))}
        </div>
      ) : (
        <iframe
          src={iframeSrc}
          title="iframe"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: "1000",
          }}
        />
      )}
    </div>
  );
};

export default SurveyDashboard;
