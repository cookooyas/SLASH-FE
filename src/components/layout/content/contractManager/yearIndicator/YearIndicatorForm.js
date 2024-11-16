import React, { useEffect, useState } from "react";
import YearIndicatorsChart from "../../../../feature/chart/yearIndicatorChart/YearIndicatorChart";
import YearIndicatorTable from "./YearIndicatorTable";
import YearHeader from "../../../../common/header/YearHeader";

const YearIndicatorForm = () => {
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().getFullYear());

  const handleContractSelection = (contractId, date) => {
    setSelectedContractId(contractId);
    setSelectedDate(date);
    console.log("계약", contractId, "날짜", date);
  };

  return (
    <div>
      <YearHeader onContractSelect={handleContractSelection} />
      <YearIndicatorsChart
        contractId={selectedContractId}
        date={selectedDate}
      />
      <YearIndicatorTable contractId={selectedContractId} date={selectedDate} />
    </div>
  );
};

export default YearIndicatorForm;
