import React, { memo, Suspense } from "react";
import { ApexOptions } from "apexcharts";

const Chart = React.lazy(() => import("react-apexcharts"));

export interface IAreaChart {
  testID: `line-chart-${string}`;
  chartData: ApexOptions["series"];
  chartOptions?: ApexOptions;
  width?: string | number;
  height?: string | number;
  minValue?: number;
  maxValue?: number;
  tickAmount?: number;
}

export const AreaChart = memo((props: IAreaChart) => {
  const chartOptions: ApexOptions = {
    chart: {
      background: "transparent",
      fontFamily: "inter",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      showForZeroSeries: true,
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
        rotate: 0,
      },
    },
    yaxis: {
      max: props.maxValue,
      min: props.minValue,
      tickAmount: props.tickAmount,
      labels: {
        style: {
          colors: "#64748B",
          fontSize: "12px",
        },
      },
    },
    ...props.chartOptions,
  };

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Chart
        data-testid={props.testID}
        options={chartOptions}
        series={props.chartData}
        type="area"
        width={props.width}
        height={props.height}
      />
    </Suspense>
  );
});
