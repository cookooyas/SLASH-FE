import React from "react";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const BottomTable = ({ initialData }) => {
  return (
    <div className="MonthStatisticsTable">
      <StatisticsListTable initialData={initialData} />
    </div>
  );
};

export default BottomTable;
