import React from "react";
import "./ContractManagerMainTop.css";
import indicator from "../../../../../assets/images/indicator.png";
import contract from "../../../../../assets/images/contract.png";
import { useNavigate } from "react-router-dom";

const ContractManagerMainTop = () => {
  const navigate = useNavigate();

  const handleContractClick = () => {
    navigate("/contractManager/createContract");
  };

  const handleIndicatorClick = () => {
    // 지표관리 페이지 이동
    navigate();
  };

  return (
    <div>
      <div className="cqRow">
        <div className="cqBox">
          <div className="cqColumn">
            <span>전체 요청 건수</span>
            <span className="cqNumber">13건</span>
            <span className="right"> > 바로가기</span>
          </div>
        </div>

        <div className="cqBox">
          <div className="cqColumn">
            <span>미할당 요청 건수</span>
            <span className="cqNumber">13건</span>
            <span className="right"> > 바로가기</span>
          </div>
        </div>

        <div className="cqBox">
          <div className="cqColumn">
            <span>할당 요청 건수</span>
            <span className="cqNumber">13건</span>
            <span className="right"> > 바로가기</span>
          </div>
        </div>

        <div className="cqBox">
          <div className="cqColumn">
            <span>금일 요청 건수</span>
            <span className="cqNumber">13건</span>
            <span className="right"> > 바로가기</span>
          </div>
        </div>

        <div className="cmBox">
          <div className="cqColumn">
            <div className="cqBox">
              <div
                className="cqMini"
                onClick={handleContractClick}
                style={{ cursor: "pointer" }}
              >
                <img src={contract} />
                계약 생성
              </div>
            </div>
            <div className="cqBox">
              <div
                className="cqMini"
                onClick={handleIndicatorClick}
                style={{ cursor: "pointer" }}
              >
                <img src={indicator} />
                지표관리
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractManagerMainTop;
