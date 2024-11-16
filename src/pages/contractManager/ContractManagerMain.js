import React, { useState } from "react";
import ContractManagerSidebar from "../../components/layout/sidebar/ContactManagerSidebar";
import ContractManagerMainContent from "../../components/layout/content/contractManager/ContractManagerMainContent";

const ContractManagerMain = () => {
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
        setEffectClass={setEffectClass} //??
      />

      <ContractManagerMainContent
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        effectClass={effectClass}
      />
    </div>
  );
};

export default ContractManagerMain;
