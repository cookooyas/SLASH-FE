import React, { useState } from "react";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import "../../styles/Content.css";
import ContractListInfo from "../../components/layout/content/contractManager/contract/ContractListInfo";

const ContractList = () => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [effectClass, setEffectClass] = useState(1);

  return (
    <div>
      <ContractManagerSidebar
        isNavOpen={isNavOpen}
        toggleNav={() => setNavOpen((prev) => !prev)}
        effectClass={effectClass}
        setEffectClass={setEffectClass}
      />
      <ContractListInfo
        isNavOpen={isNavOpen}
        toggleNav={() => setNavOpen((prev) => !prev)}
        effectClass={effectClass}
      />
    </div>
  );
};

export default ContractList;
