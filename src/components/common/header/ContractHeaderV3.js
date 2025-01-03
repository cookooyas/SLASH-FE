import React, {useEffect, useState} from "react";
import {FaAsterisk} from "react-icons/fa6";
import "./ContractHeader.css";
import {fetchAllContractName} from "../../../api/UserService";

const ContractHeaderV3 = ({
                            onContractSelect,
                            setSelectedAgreementId,
                            selectedAgreementId,
                            selectedDate,
                            setSelectedDate
                          }) => {
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [contracts, setContracts] = useState([]);


  // 날짜가 변경될 때마다 selectedDate 업데이트
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAgreementChange = (e) => {
    const id = e.target.value;
    setSelectedAgreementId(id);
    onContractSelect(id);
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          console.log(
            "Fetched contract names:",
            data.map((contract) => contract.contractName)
          );
          setContracts(data);
          if (data.length > 0) {
            setSelectedAgreement(data[0].contractName);
            setSelectedAgreementId(data[0].contractId);
          }
          console.log(selectedAgreementId, selectedAgreement);
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };
    fetchContracts();
  }, [selectedAgreement, selectedAgreementId, setSelectedAgreementId]);

  return (
    <div className="topIndex">
      <FaAsterisk className="star"/>
      협약서
      <select
        className="criteria2"
        value={selectedAgreementId || ""}
        onChange={handleAgreementChange}
      >
        {contracts.map((contract) => (
          <option key={contract.contractId} value={contract.contractId}>
            {contract.contractName}
          </option>
        ))}
      </select>
      <input
        type="month"
        className="criteria2"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default ContractHeaderV3;
