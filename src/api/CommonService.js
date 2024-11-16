import axios from "./Interceptor";

export const fetchAllContractInfo = async () => {
  try {
    const response = await axios.get("/contract-manager/all-contract");
    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const fetchContractInfo = async (contractId) => {
  try {
    const response = await axios.get(`/common/contract/${contractId}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "ERROR: ",
      error.response ? error.response.data : error.message
    );
  }
};

//모든 계약 이름 조회
export const fetchAllContractName = async () => {
  try {
    const response = await axios.get("/common/all-contract-name");
    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

//평가 지표에 대한 상세 정보
export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const response = await axios.get(`/common/detail/${evaluationItemId}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

//월간 지표 조회
export const fetchIndicators = async (contractId, yearMonth) => {
  try {
    const response = await axios.get(`/common/${contractId}/month-indicators`, {
      params: { date: yearMonth },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching indicators:", error);
    throw error;
  }
};

//사용자 지표 관리 자세히보기 클릭 후의 화면에 사용되는 지표의 상세 정보
export const fetchEvaluationDetail = async (evaluationItemId) => {
  try {
    const response = await axios.get(`/common/detail/${evaluationItemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation detail:", error);
    throw error;
  }
};
//서비스 지표에 대한 장비별 통계 API
export const fetchEvaluationEquipment = async (evaluationItemId, date) => {
  try {
    const response = await axios.get(
      `/common/statistics/evaluation-item/${evaluationItemId}`,
      {
        params: {
          date,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation equipment data:", error);
    throw error;
  }
};

export const fetchServiceUptime = async (evaluationItemId, date) => {
  try {
    const response = await axios.get(`/common/statistics`, {
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 서비스 가동률:", error);
    throw error;
  }
};

export const fetchCommonServiceStatistics = async (evaluationItemId, date) => {
  try {
    const response = await axios.get(`/common/service-statistics`, {
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 서비스요청 적기처리율:", error);
    throw error;
  }
};

export const fetchCommonIncidentStatistics = async (evaluationItemId, date) => {
  try {
    const response = await axios.get(`/common/incident-statistics`, {
      params: {
        date,
        evaluationItemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error 장애적기처리율:", error);
    throw error;
  }
};

export const fetchServiceStatistics = async (evaluationId, date) => {
  try {
    const response = await axios.get("/contract-manager/service-statistic", {
      params: {
        evaluationId: evaluationId,
        date: date,
      },
    });
    return response.data.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching service statistics:", error);
    throw error; // 에러 발생 시 처리
  }
};

export const fetchServiceOperationStatistics = async (evaluationId, date) => {
  try {
    const response = await axios.get("/contract-manager/service-statistic", {
      params: {
        evaluationId: evaluationId,
        date: date,
      },
    });
    return response.data.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching service statistics:", error);
    throw error; // 에러 발생 시 처리
  }
};

export const fetchEvaluationItemCategory = async (contractId) => {
  try {
    const response = await axios.get(
      `common/evaluation-item-category/${contractId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("에러 메세지를 몰러유");
  }
};

// downloadPdf 함수
export const downloadPdf = async (evaluationItemId, date) => {
  try {
    const response = await axios.get(`/common/pdf/${evaluationItemId}`, {
      params: { date },
      responseType: "blob", // 응답 타입을 blob으로 설정
    });
    return response.data;
  } catch (error) {
    console.error("PDF 다운로드 오류:", error);
    throw error;
  }
};

export const fetchYearlyWeightedScores = async (contractId, date) => {
  try {
    const response = await axios.get(`/common/${contractId}/weighted-score`, {
      params: { date },
    });
    return response.data.data;
  } catch (error) {
    console.error("스택 차트 오류 발생");
    throw error;
  }
};

export const fetchYearIndicators = async (contractId, date) => {
  try {
    const response = await axios.get(`/common/${contractId}/year-indicators`, {
      params: { date },
    });
    return response.data.data;
  } catch (error) {
    console.error("연간 지표 테이블 조회 오류 발생");
    throw error;
  }
};
