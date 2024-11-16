import React, { useEffect, useState } from "react";
import "./ContractListForm.css";
import { fetchAllContractInfo } from "../../../../../../api/ContractManagerService";
import ContractListTable from "../../../../../feature/table/ContractListTable";
import { useNavigate } from "react-router-dom";

const ContractListForm = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchAllContractInfo();
      setFormData(response);
    };
    loadData();
  }, []);

  const handleCreateContract = () => {
    navigate("/contractManager/createContract");
  };

  return (
    <>
      <div className="contractListForm">
        <div className="contractListInfo">
          <div className="ContractTitle">
            <p>계약 현황 조회</p>
            <button
              className="smallBlackButton"
              onClick={() => handleCreateContract()}
            >
              계약추가
            </button>
          </div>
          <div className="table contractListTable">
            <ContractListTable initialData={formData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractListForm;
