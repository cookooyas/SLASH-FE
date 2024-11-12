import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const fetchAllContractInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기

    const response = await axios.get("/contract-manager/all-contract", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      console.log(response.data.data);

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
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/contract/${contractId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    if (response.data.success) {
      console.log(response);

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
    const token = localStorage.getItem("accessToken");

    const response = await axios.get("/common/all-contract-name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/detail/${evaluationItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/${contractId}/indicators`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`/common/detail/${evaluationItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluation detail:", error);
    throw error;
  }
};
//서비스 지표에 대한 장비별 통계 API
export const fetchEvaluationEquipment = async (evaluationItemId, date) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `/common/statistics/evaluation-item/${evaluationItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
