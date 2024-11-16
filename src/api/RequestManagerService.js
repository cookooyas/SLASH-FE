import axios from "./Interceptor";

export const getMonthlyData = async (
  selectedYear,
  selectedMonth,
  contractId
) => {
  try {
    const params = {
      year: selectedYear,
      month: selectedMonth,
      contractId: contractId,
    };
    // axios 요청 수정
    const response = await axios.get("/request-manager/monthly-data", {
      params,
    });

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);

    return []; // 오류 발생 시 빈 배열 반환
  }
};

export const assignTaskManager = async (dto) => {
  try {
    const response = await axios.patch(
      "/contract-manager/request/allocate",
      dto
    );

    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("요청 중 오류 발생:", error); // 전체 오류 정보 출력
  }
};

export const getManagerTaskStatus = async () => {
  try {
    const response = await axios.get("/contract-manager/status");
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("데이터 전송 오류:", error);
    return []; // 오류 발생 시 null 반환
  }
};
export const completeRequest = async (requestId) => {
  try {
    const response = await axios.patch(
      `/request-manager/request/complete?requestId=${requestId}`,
      null
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "서버 응답 에러:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("요청 실패:", error.message);
    }
    return []; // 오류 발생 시 빈 배열 반환
  }
};
