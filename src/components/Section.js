import React, { useState } from "react";

const Section = ({ componentTitle, children }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="section">
      <strong>{showDetails ? null : componentTitle}</strong>
      {showDetails ? (
        <>
          {children}
          <button className="small-button" onClick={toggleDetails}>
            Hide Details
          </button>
        </>
      ) : (
        <button className="small-button" onClick={toggleDetails}>
          Show Details
        </button>
      )}
    </div>
  );
};

export default Section;
