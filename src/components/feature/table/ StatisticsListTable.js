import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./StatisticsListTable.css";

const StatisticsListTable = ({ initialData }) => {
  const navigate = useNavigate();

  const handleDetailClick = (evaluationItemId, date) => {
    if (evaluationItemId && date) {
      navigate(
        `/contractManager/indexManagement/detail/${evaluationItemId}/${date}`
      );
    } else {
      console.error("Missing parameters:", { evaluationItemId, date });
    }
  };

  return (
    <div className="listTable">
      {initialData?.indicatorList && initialData?.indicatorList.length > 0 ? (
        <>
          <div className="listTableHead">
            <p className="listTableCategory headerP">지표구분</p>
            <p className="isAutoP headerP">자동계산여부</p>
            <p className="dateP headerP">측정월</p>
            <p className="scoreP headerP">평가 점수</p>
            <p className="weightScoreP headerP">평가 점수(가중치 적용)</p>
            <p className="gradeP headerP">평가 등급</p>
            <p className="buttonP"></p>
          </div>
          {initialData?.indicatorList.map((item, index) => (
            <div className="listTableBody" key={item.evaluationItemId || index}>
              <p className="listTableCategory">{item.category}</p>
              <p className="isAutoP">{item.isAuto ? "자동" : "수동"}</p>
              <p className="dateP">{item.date}</p>
              <p className="scoreP">{item.score}</p>
              <p className="weightScoreP">{item.weightedScore}</p>
              <p className="gradeP">{item.grade}</p>
              <p className="buttonP">
                <button
                  onClick={() =>
                    handleDetailClick(item.evaluationItemId, item.date)
                  }
                >
                  자세히보기
                  <MdKeyboardArrowRight />
                </button>
              </p>
            </div>
          ))}
          <div className="listTableBody">
            <p className="listTableCategory">전체</p>
            <p className="isAutoP"></p>
            <p className="dateP"></p>
            <p className="scoreP"></p>
            <p className="weightScoreP">
              {initialData?.indicatorEtcInfo?.score || "-"}
            </p>
            <p className="gradeP">
              {initialData?.indicatorEtcInfo?.grade || "-"}
            </p>
            <p className="buttonP"></p>
          </div>
        </>
      ) : (
        <div className="noData">
          <p>통계값이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default StatisticsListTable;
