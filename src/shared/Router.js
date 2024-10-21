import React from "react";
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import User from "../pages/user/User";
import ContractManager from "../pages/contractManager/ContractManager";
import RequestManager from "../pages/requestManager/RequestManager";
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 
                        Routes안에 이렇게 작성합니다. 
                        path는 우리가 흔히 말하는 사용하고싶은 "주소"를 넣어주면 됩니다.
                        element는 해당 주소로 이동했을 때 보여주고자 하는 컴포넌트를 넣어줍니다.
        */}
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/contractManager" element={<ContractManager />} />
        <Route path="/requestManager" element={<RequestManager />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;