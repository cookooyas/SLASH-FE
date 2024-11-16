import React, { useEffect, useState } from "react";
import "./MiddleIndex.css";
import "../../../../../styles/Font.css";
import GradeChart from "../../../../feature/chart/GradeChart";

const MiddleIndex = ({ initialData }) => {
  return (
    <div className="middle">
      <div className="totalIndex">
        <div className="title">종합평가 등급</div>
        <div className="value">
          {initialData?.indicatorEtcInfo?.grade || ""}등급
        </div>
        <div className="subText">
          {initialData?.indicatorEtcInfo?.score || ""}점
        </div>
      </div>
      <div className="monthChart">
        <GradeChart indicatorList={initialData?.indicatorList || []} />
      </div>
    </div>
  );
};

export default MiddleIndex;
