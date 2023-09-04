import React from "react";
import Schedule from "../../Components/Master/Schedule";

function PathshalaSchedule() {
  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  let CYear = LocalUser?.currentAcademicYearName;

  return (
    <div className="row" style={{ marginTop: "15px" }}>
      <h4
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "15px",
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            marginLeft: "15px",
            marginBottom: "20px",
            marginRight: "10px",
          }}
        >
          Pathshala Schedule
        </span>
        <span
          style={{ fontSize: "large", marginBottom: "15px", color: "#ff4081" }}
        >
          {CYear}
        </span>
      </h4>
      <Schedule />
    </div>
  );
}

export default PathshalaSchedule;
