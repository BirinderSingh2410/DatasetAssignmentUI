import React from "react";
import "./CardContents.css";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

function CardContents({ mainData, isdrawer }) {
  const myMap = new Map(Object.entries(mainData));
  const titleSet = new Set([
    "Frontend",
    "Backend",
    "Technologies",
    "Infrastructre",
    "Databases",
  ]);
  return (
    <Box sx={isdrawer ? { margin: "20px" } : null}>
      {Array.from(myMap).map(([key, data]) => (
        <Box key={key}>
          <div className="title-content">
            {isdrawer ? <LeaderboardIcon /> : null}
            <p>{key}</p>
          </div>
          {titleSet.has(key) ? (
            data
              .split(",")
              .map((value, i) => (
                <Chip
                  key={i}
                  className="chip"
                  label={value.length > 0 ? value : "Not mentioned"}
                  color={isdrawer ? "info" : "primary"}
                  variant={isdrawer ? "" : "outlined"}
                />
              ))
          ) : (
            <p style={{ fontWeight: "bolder", fontSize: "larger" }}>{data}</p>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default CardContents;
