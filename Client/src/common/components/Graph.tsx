/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Chart, ArcElement } from "chart.js";
import { Tooltip } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Labels from "./Labels";
import "../../App.css";

Chart.register(ArcElement);
Chart.register(ChartDataLabels);
Chart.register(Tooltip);

export interface GraphData {
  [category: string]: number;
}

interface GraphProps {
  data: GraphData;
  type: string;
}

const Graph: React.FC<GraphProps> = ({ data , type}) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const storeAmount= totalAmount;

  if(type=="dashboard")
    {
      useEffect(() => {
        const amount = data.IncomeTotal - data.ExpenseTotal;
        setTotalAmount(amount);
      }, []);     
    }
    else{
      useEffect(() => {
        const newTotalAmount = Object.values(data).reduce(
          (acc, val) => acc + Number(val),
          0
        );
        setTotalAmount(newTotalAmount);
      }, [data]);
    }

  localStorage.setItem(type, storeAmount.toString());

  const generateColors = (count: number): string[] => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    return colors;
  };

  const categoryCount = Object.keys(data).length;

  const colors = generateColors(categoryCount);
  // const totalAmount = Object.values(data).reduce(
  //   (acc, val) => acc + Number(val),
  //   0
  // );

  console.log("Data........0123", data);

  const config = {
    data: {
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: colors,
          hoverOffset: 10,
          borderRadius: 30,
          spacing: 3,
        },
      ],
      // labels: Object.keys(data),
    },
    options: {
      cutout: 115,
      // radius:100,
      layout: {
        padding: {
          top: 0,
        },
      },
      plugins: {
        // tooltip: {
        //   // mode: "index",
        //   callbacks: {
        //     label: (context: any) => {
        //       const label = context.label || "";
        //       const value = context.formattedValue;
        //       return `${label}: $${value}`;
        //     },
        //   },
        // },
        datalabels: {
          display: (context: any) => {
            return context.active;
          },
          color: "white",
          formatter: (value: any) => {
            return `$${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const categoriesWithColors = Object.keys(data).map((category, index) => ({
    name: category,
    color: colors[index],
  }));

  return (
    <div className="flex justify-content max-w-md mx-auto">
      <div className=" item">
        <div className=" chart relative">
          <Doughnut {...config}></Doughnut>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="mb-2 font-bold text-xl text-gray-800">Total</h3>
            <span className="block text-2xl text-emerald-400">
              ${totalAmount}
            </span>
          </div>
        </div>
        <div className="flex flex-col py-10 gap-4">
          <Labels categories={categoriesWithColors}></Labels>
        </div>
      </div>
    </div>
  );
};

export default Graph;
