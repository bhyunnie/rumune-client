import {
  select,
  scaleBand,
  scaleLinear,
  axisBottom,
  max,
  axisLeft,
  line,
} from "d3";
import React, { useEffect, useRef } from "react";
import { UserCountChart } from "../global/utils/typeUtil";

enum chartType {
  candle = "candle",
  line = "line",
}

const StandardChart = (props: { data: UserCountChart[]; type: string }) => {
  const type = props.type;
  const data = props.data;
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!(type in chartType))
      throw new Error("잘못된 차트 타입을 입력 했습니다.");

    switch (type) {
      case chartType.candle:
        makeCandleChart();
        break;
      case chartType.line:
        makeLineChart();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const makeCandleChart = () => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const svg = select(chartRef.current);
    // 그래프 영역 크기 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1440;
    const height = 400;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x, y 스케일 정의
    const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.time));

    const y = scaleLinear()
      .rangeRound([height, 0])
      .domain([0, max(data, (d) => d.count) || 0]);

    // x, y축 생성
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x));

    g.append("g")
      .call(axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    // 막대 생성
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.time) || 0)
      .attr("y", (d) => y(d.count) || 0)
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - (y(d.count) || 0));
  };
  const makeLineChart = () => {
    if (!data || data.length === 0 || !chartRef.current) return;

    const svg = select(chartRef.current);
    // 그래프 영역 크기 설정
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 1440;
    const height = 400;
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // x, y 스케일 정의
    const x = scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.time));

    const y = scaleLinear()
      .rangeRound([height, 0])
      .domain([0, max(data, (d) => d.count) || 0]);

    // x, y축 생성
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(axisBottom(x));

    g.append("g")
      .call(axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    // 선 생성
    const lineGenerator = line<UserCountChart>()
      .x((d) => x(d.time)! + x.bandwidth() / 2) // 선의 x 좌표 설정
      .y((d) => y(d.count)!); // 선의 y 좌표 설정

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);
  };

  return (
    <React.Fragment>
      <svg className="user-chart-svg" ref={chartRef}></svg>
    </React.Fragment>
  );
};

export default StandardChart;
