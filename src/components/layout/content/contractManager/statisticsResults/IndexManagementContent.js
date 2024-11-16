import React, { useState, useEffect } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import MiddleIndex from "./MiddleIndex";
import ContractHeaderV1 from "../../../../common/header/ContractHeaderV1";
import { fetchIndicators } from "../../../../../api/CommonService";
import { fetchAllContractName } from "../../../../../api/UserService";
import StatisticsListTable from "../../../../feature/table/ StatisticsListTable";

const IndexManagementContent = ({ isNavOpen, toggleNav, effectClass }) => {
  // 전체 계약 정보 조회
  const [agreements, setAgreements] = useState([]);

  // agreement와 date의 경우 새로고침시에 정보를 유지하기 위해 세션에 해당 정보 저장
  const [selectedAgreement, setSelectedAgreement] = useState(
    JSON.parse(sessionStorage.getItem("selectedAgreement")) || null
  );
  const [selectedDate, setSelectedDate] = useState(
    sessionStorage.getItem("selectedDate") || null
  );

  const [contractData, setContractData] = useState({});

  // 계약정보를 불러오는 함수
  const fetchInitialContracts = async () => {
    try {
      const data = await fetchAllContractName();
      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          setAgreements(data);

          // 초기에 세션에 저장된 agreement가 없다면 세션에 신규 등록
          if (!selectedAgreement) {
            setSelectedAgreement(data[0]);
            sessionStorage.setItem(
              "selectedAgreement",
              JSON.stringify(data[0])
            );
          }

          // 초기에 세션에 저장된 date가 없다면 세션에 신규 등록
          if (!selectedDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
            const day = String(today.getDate()).padStart(2, "0");
            const date = `${year}-${month}-${day}`;
            setSelectedDate(date);
            sessionStorage.setItem("selectedDate", date);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch contracts: ", error);
    }
  };

  // 해당 페이지에서 이용하는 날짜 형식
  const dateFormatter = (date) => {
    const [year, month] = date.split("-");
    return `${year}-${month}`;
  };

  // 초기화 : 해당 페이지가 랜더링되었을 때, 최상위 컴포넌트가 해당 정보를 관리하는 것이 타당해 보임.
  useEffect(() => {
    fetchInitialContracts();
  }, []);

  // 선택된 agreement가 바뀔 경우 세션 업데이트
  useEffect(() => {
    if (selectedAgreement) {
      sessionStorage.setItem(
        "selectedAgreement",
        JSON.stringify(selectedAgreement)
      );
    }
  }, [selectedAgreement]);

  // 선택된 date가 바뀔 경우 세션 업데이트
  useEffect(() => {
    if (selectedDate) {
      sessionStorage.setItem("selectedDate", selectedDate);
    }
  }, [selectedDate]);

  // agreement, 날짜가 변할 경우 새로운 contractData fetch
  useEffect(() => {
    const fetchData = async () => {
      if (selectedAgreement && selectedDate) {
        try {
          const response = await fetchIndicators(
            selectedAgreement.contractId,
            dateFormatter(selectedDate)
          );
          if (response && response.success) {
            setContractData(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch indicator data:", error);
        }
      }
    };
    fetchData();
  }, [selectedAgreement, selectedDate]);

  return (
    <div
      className={`pageContent pageContentOffcanvas${effectClass} ${
        isNavOpen ? "jsOpened" : ""
      }`}
    >
      <button
        className={`navOpenBtn ${isNavOpen ? "jsHidden" : ""}`}
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg" />
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="contentBox">
          {/* 자식 컴포넌트에 콜백 함수 전달 */}
          <ContractHeaderV1
            agreements={agreements}
            selectedAgreement={selectedAgreement}
            setSelectedAgreement={setSelectedAgreement}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateFormat={`month`}
          />
          {/* 상태를 자식 컴포넌트로 전달 */}
          <MiddleIndex initialData={contractData} />
          <div className="MonthStatisticsTable">
            <StatisticsListTable initialData={contractData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexManagementContent;
