import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//
// 요청 인터셉터: 모든 요청에 자동으로 토큰 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      alert("인증이 만료되었습니다. 다시 로그인해 주세요.");
      // localStorage.removeItem("accessToken"); // 토큰 삭제
      //   window.location.href = "/"; // 로그인 페이지로 리다이렉션
    }
    // 403 Forbidden 에러 처리
    else if (status === 403) {
      alert("권한이 없습니다. 접근이 제한된 페이지입니다.");
      //   window.location.href = "/"; // 권한 오류 페이지로 리다이렉션 (필요시 경로 수정)
    } else {
      //   const errorMessage =
      //     error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      //   alert(`오류 발생: ${errorMessage}`);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
