import React, { useState } from "react";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import "../../styles/Content.css";
import EvaluationItemInfo from "../../components/layout/content/contractManager/evaluationItem/EvaluationItemInfo";

const EvaluationItemDetail = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <ContractManagerSidebar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />
      <EvaluationItemInfo
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default EvaluationItemDetail;
