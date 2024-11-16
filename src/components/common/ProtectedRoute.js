import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      logout();
      setRedirectPath("/"); // 리다이렉트 경로 설정
    } else {
      const hasAccess = allowedRoles.includes(user.auth);
      if (!hasAccess) {
        alert("접근 권한이 없습니다.");
        setRedirectPath("/"); // 리다이렉트 경로 설정
      }
    }
  }, [isAuthenticated, user, allowedRoles, logout]);

  // 리다이렉트 조건 확인
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  // 모든 조건을 통과한 경우 자식 컴포넌트를 렌더링
  return children;
};

export default ProtectedRoute;
