import React, { useEffect, useState } from "react";
import MonthPicker from "../../../../feature/MonthPicker";
import "./RequestManagerTop.css";
import { getMonthlyData } from "../../../../../services/api/userService";
import { StatusPieChart } from "../../../../feature/chart/StatusPieChart";
import { PieChart } from "../../../../feature/chart/systemTypeChart/PieChart";

const RequestManagerTop = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0"),
  );

  // 초기 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMonthlyData(year, month);
      console.log("초기 데이터:", response.data); // 초기 데이터 출력
      setMonthlyData(response.data); // 상태 업데이트
    };

    fetchData(); // 데이터 요청
  }, [year, month]); // year와 month가 변경될 때마다 호출

  // MonthPicker에서 데이터를 업데이트할 핸들러 함수
  const handleMonthlyDataChange = async (selectedYear, selectedMonth) => {
    console.log("받은 데이터:", selectedYear, selectedMonth); // 데이터 출력
    const data = await getMonthlyData(selectedYear, selectedMonth);
    setMonthlyData(data); // 상태 업데이트
  };

  return (
    <div className="rmRow">
      <div className="rmColumn rm2">
        <div className="rmRow">
          <div className="rmBox">
            <div className="rqColumn">
              <span>전체 요청 건수</span>
              <span className="rqNumber">
                {monthlyData && monthlyData.statusCountRequest
                  ? monthlyData.statusCountRequest.total
                  : 0}
                건
              </span>
            </div>
          </div>

          <div className="rmBox">
            <div className="rqColumn">
              <span>접수 완료 건수</span>
              <span className="rqNumber">
                {monthlyData && monthlyData.statusCountRequest
                  ? monthlyData.statusCountRequest.registered
                  : 0}
                건
              </span>
            </div>
          </div>

          <div className="rmBox">
            <div className="rqColumn">
              <span>처리중인 건수</span>
              <span className="rqNumber">
                {monthlyData && monthlyData.statusCountRequest
                  ? monthlyData.statusCountRequest.processing
                  : 0}
                건
              </span>
            </div>
          </div>

          <div className="rmBox">
            <div className="rqColumn">
              <span>처리 완료 건수</span>
              <span className="rqNumber">
                {monthlyData && monthlyData.statusCountRequest
                  ? monthlyData.statusCountRequest.completed
                  : 0}
                건
              </span>
            </div>
          </div>
        </div>

        <div className="rmRow">
          <div className="rmBox">
            <div className="rqColumn">
              <span>장비유형</span>
              <PieChart data={monthlyData?.systemCountList} />
            </div>
          </div>

          <div className="rmBox">
            <div className="rqColumn">
              <span>업무유형</span>
              <PieChart data={monthlyData?.taskTypeCountList} />
            </div>
          </div>

          <div className="rmBox">
            <div className="rqColumn">
              <span>TOTAL STATUS</span>
              <StatusPieChart data={monthlyData?.statusCountRequest} />
            </div>
          </div>
        </div>
      </div>

      <div className="rm1">
        <MonthPicker
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          onChange={handleMonthlyDataChange}
        />
      </div>
    </div>
  );
};

export default RequestManagerTop;