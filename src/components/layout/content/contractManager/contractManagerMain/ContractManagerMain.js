import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ContractManagerMain.css";
import {
  fetchAllContractName,
  fetchContractInfo,
} from "../../../../../api/CommonService";
import GradeHorizonTable from "../../../../feature/table/GradeHorizonTable";
import EvaluationItemListTable from "../../../../feature/table/EvaluationItemListTable";

const ContractManagerMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [contractId, setContractId] = useState(null);
  const [contractInfo, setContractInfo] = useState(null);
  const [contractList, setContractList] = useState([]);
  const [evaluationItems, setEvaluationItems] = useState([]);
  const [contractName, setContractName] = useState("");
  const [selectContractId, setSelectContractId] = useState(null);

  // 초기 계약 리스트와 첫 번째 계약 정보 로드
  useEffect(() => {
    const loadData = async () => {
      const response = await fetchAllContractName();
      setContractList(response);

      let firstContractId = null;

      // 경로에 따라 처리
      // /contractManager/contractDetail 경로에서는 state에서 contractId를 사용
      if (!!location.state) {
        firstContractId = location.state?.contractId;
        setContractId(firstContractId);
        setSelectContractId(firstContractId);

        if (firstContractId) {
          const initialContractInfo = await fetchContractInfo(firstContractId);
          setContractInfo(initialContractInfo);
          setEvaluationItems(initialContractInfo?.evaluationItems || []);
          setContractName(initialContractInfo?.contractName || "");
        } else {
          console.warn("No contract ID found or state is empty.");
        }
      } else {
        alert("잘못된 접근입니다.");
        navigate(-1);
      }
    };
    loadData();
  }, []);

  // 계약 변경 시마다 계약 정보 로드
  const handleContractChange = async (event) => {
    const newContractId = Number(event.target.value);
    setSelectContractId(newContractId);
    setContractId(newContractId);

    if (newContractId) {
      const contractInfo = await fetchContractInfo(newContractId);
      setContractInfo(contractInfo);
      setEvaluationItems(contractInfo.evaluationItems);
      setContractName(contractInfo.contractName);
    }
  };

  const handleAddEvaluation = (contractId) => {
    navigate("/contractManager/addEvaluationItem", {
      state: { contractId, contractName },
    });
  };

  const handleAddContract = () => {
    navigate("/contractManager/createContract");
  };

  const handleEditContract = (contractId) => {
    navigate(`/contractManager/updateContract/${contractId}`);
  };

  return (
    <div className="contractManagerMainDiv">
      <div className="contractSelect">
        <span className="contractTitleSpan">*</span>
        <p>협약서</p>
        <select
          className="contractDropDown"
          value={selectContractId ?? ""}
          onChange={handleContractChange}
        >
          {contractList.map((item) => (
            <option key={item.contractId} value={item.contractId}>
              {item.contractName}
            </option>
          ))}
        </select>
      </div>
      {contractList.length > 0 ? (
        contractInfo && contractInfo.contractName ? (
          <>
            <div className="mainContractInfo">
              <p>협약서: {contractInfo.contractName}</p>
              <p>계약 시작일: {contractInfo.startDate}</p>
              <p>계약 만료일: {contractInfo.endDate}</p>
            </div>

            <div className="mainSlaGrade">
              <div className="mainCardTitle">
                <div className="mainCardTitleP">
                  <p>종합 평가 등급</p>
                </div>
                <div className="mainGradeEditBtnDiv">
                  <button onClick={() => handleEditContract(contractId)}>
                    수정하기
                  </button>
                </div>
              </div>

              <div className="table mainTotalGrade">
                <GradeHorizonTable initialData={contractInfo.totalTargets} />
              </div>
            </div>

            <div className="mainServiceCategory">
              <div className="mainCardTitle">
                <div className="mainCardTitleP">
                  <p>서비스 평가 항목</p>
                </div>
                <div className="mainGradeEditBtnDiv">
                  <button onClick={() => handleAddEvaluation(contractId)}>
                    지표추가
                  </button>
                </div>
              </div>
              <div className="categoryTitle">
                <EvaluationItemListTable
                  data={evaluationItems}
                  contractName={contractName}
                  contractId={contractId}
                />
              </div>
            </div>
          </>
        ) : (
          <div>계약 정보가 없습니다.</div>
        )
      ) : (
        <div className="noContracts">
          <p>계약 목록이 없습니다.</p>
          <button className="addContractBtn" onClick={handleAddContract}>
            계약추가
          </button>
        </div>
      )}
    </div>
  );
};

export default ContractManagerMain;
