import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart:React.FC = () => {
  const params = useParams();
  const currId = params.coinId || "bitcoin";

  const [stockGraph, setStockGraph] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/${currId}/market_chart?vs_currency=INR&days=15?x_cg_demo_api_key=CG-iwPtJRdKKJzS8SThBdi96jqE`;
  useEffect(() => {
    const fetchHistoricData = async () => {
      const { data } = await axios.get(url);
      setStockGraph(data.prices);
    };
    fetchHistoricData();
  }, [url]);
  const totalDuration = 8000;
  const delayBetweenPoints = totalDuration / stockGraph.length;
  const previousY = (ctx: {
    index: number;
    chart: {
      scales: { y: { getPixelForValue: (arg0: number) => any } };
      getDatasetMeta: (arg0: any) => {
        (): any;
        new (): any;
        data: {
          getProps: (
            arg0: string[],
            arg1: boolean
          ) => { (): any; new (): any; y: any };
        }[];
      };
    };
    datasetIndex: any;
  }) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;

  const animation: any = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx: { type: string; xStarted: boolean; index: number }) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx: { type: string; yStarted: boolean; index: number }) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const options: ChartOptions<"line"> = {
    animation,
    maintainAspectRatio: false,
    scales: {},
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25, // Set the font size here
          },
        },
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  return (
    <div className="sm:w-[20rem] md:w-[35rem] lg:w-[50rem] ">
      <Line
        data={{
          labels: stockGraph.map((coin) => {
            return "";
          }),
          datasets: [
            {
              data: stockGraph.map((coin) => coin[1]),
              label: `Price ( Past 15 Days ) in INR`,
              borderColor: "black",
            },
          ],
        }}
        height={400}
        options={options}
      />
    </div>
  );
};

export default LineChart;
