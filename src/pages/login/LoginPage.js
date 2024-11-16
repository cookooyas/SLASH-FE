import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import LoginInputGroup from "../../components/layout/content/login/LoginInputGroup";
import LoginErrorMessage from "../../components/layout/content/login/LoginErrorMessage";
import LoginMain from "../../components/layout/content/login/LoginMain";
import "../../styles/Login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [idError, setIdError] = useState(null);
  const [pwError, setPwError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // id의 에러 조건 추가
    if (id.length === 0) {
      setIdError("아이디를 입력해주세요");
      return;
    }
    // pw의 에러 조건 추가
    if (password.length === 0) {
      setPwError("비밀번호를 입력해주세요");
      return;
    }
    try {
      await login(id, password);
    } catch (e) {
      setPwError(e.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.auth) {
        case "ROLE_CONTRACT_MANAGER":
          navigate("/contractManager");
          break;
        case "ROLE_REQUEST_MANAGER":
          navigate("/requestManager");
          break;
        case "ROLE_USER":
          navigate("/user");
          break;
      }
    }
  }, [isAuthenticated, user]);

  return (
    <LoginMain>
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <LoginInputGroup
          type="text"
          value={id}
          placeholder="아이디"
          onChange={(e) => {
            setId(e.target.value);
            setIdError(null);
            setPwError(null);
          }}
          icon={<FaUser className="inputIcon" />}
          error={idError}
        />
        <LoginErrorMessage message={idError} />

        <LoginInputGroup
          type={hidePassword ? "password" : "text"}
          value={password}
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
            setIdError(null);
            setPwError(null);
          }}
          icon={<FaLock className="inputIcon" />}
          isPassword
          toggleVisibility={() => setHidePassword((prev) => !prev)}
          error={pwError}
        />
        <LoginErrorMessage message={pwError} />

        <button type="submit" className="loginButton">
          로그인
        </button>
      </form>
    </LoginMain>
  );
};

export default Login;
