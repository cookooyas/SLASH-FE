import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./GradeChart.css";
import { MdHeight } from "react-icons/md";

const GradeChart = ({ indicatorList }) => {
  // x축 카테고리와 y축 데이터 준비
  const xCategory = indicatorList.map((item) => item.category);

  // 각 카테고리에 따른 색상 설정
  const data = indicatorList.map((item) => {
    let color;
    switch (item.category) {
      case "서비스 가동률":
        color = "#2C70F4"; // 파랑
        break;
      case "장애 적기처리율":
        color = "#FE4853"; // 초록
        break;
      case "서비스요청 적기처리율":
        color = "#06D86F"; // 빨강
        break;
      default:
        color = "#888888"; // 기본 색상
    }
    return { y: item.weightedScore, color };
  });

  // y축 최대값을 10 단위로 설정
  const yMax = Math.ceil(Math.max(...data.map((d) => d.y)) / 10) * 10 + 10;

  // Highcharts 옵션
  const options = {
    chart: {
      type: "column",
      height: 280,
      backgroundColor: "transparent", // 배경 투명
      padding: 30,
      margin: 50,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: xCategory,
      lineWidth: 0, // x축 아래 선 제거
    },
    yAxis: {
      title: {
        text: null,
      },
      min: 0,
      max: yMax,
      tickInterval: 10, // y축을 10 단위로 설정
      gridLineWidth: 0,
    },
    plotOptions: {
      series: {
        pointWidth: 20,
        borderRadius: {
          radius: 10,
        },
      },
    },
    series: [
      {
        data: data, // 카테고리별 색상 데이터 적용
      },
    ],
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: true, // hover 시 값이 나오지 않게 설정
    },
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              display: false,
            },
            yAxis: {
              labels: {
                align: "left",
                x: 0,
                y: 0,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      {indicatorList.length === 0 ? (
        <div className="noChartMessage">
          <p>산출 결과가 없습니다</p>
        </div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
};

export default GradeChart;
