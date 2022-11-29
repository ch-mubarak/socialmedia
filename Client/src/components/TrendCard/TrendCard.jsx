import React from "react";
import "./TrendCard.css";
import { trendData } from "../../Data/TrendData";

const TrendCard = () => {
  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {trendData.map((trend) => {
        return (
          <div key={trend.id} className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
