import React, { useState } from 'react';
import DashboardReport from './DashboardReport';


const Card = ({ imageSrc, title, link, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        padding: "20px",
        margin:"20px",
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <div
        style={{
          padding: '16px',
          background: '#fff',
        }}
      >
        <h2
          style={{
            margin: '0',
            fontSize: '26px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};

const StateDashboard = () => {
  const [iframeSrc, setIframeSrc] = useState('');

  const handleCardClick = () => {
    setIframeSrc('https://app.powerbi.com/view?r=eyJrIjoiYWMyOGM5ODEtYjI4My00ZTMxLWJmNzUtOTY2MmJjZTNhNGQwIiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9');
  };

  const handleCardClick2 = () => {
    setIframeSrc('https://app.powerbi.com/view?r=eyJrIjoiNDQxMDg0MzItMGJiMy00NjUwLTlhMjctMmRhY2EyYzc5ZTQ4IiwidCI6ImE0NDY0OWI4LTg3ZDQtNDUyNC04ZjYwLTEwNTgxMGRhZDRiNiJ9');
  };

  return (
    <div>
      <DashboardReport />
      {!iframeSrc ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <Card
            imageSrc="https://www.scnsoft.com/images-for-demo/power-bi.png"
            title="State Dashboard"
            onCardClick={handleCardClick}
          />
           <Card
            imageSrc="https://www.scnsoft.com/images-for-demo/power-bi.png"
            title="Assembly Survey Tracker"
            onCardClick={handleCardClick2}
          />
        </div>
      ) : (
        <iframe
          src={iframeSrc}
          title="iframe"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            zIndex: '1000',
          }}
        />
      )}
    </div>
  );
};

export default StateDashboard;
