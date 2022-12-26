import {
   Chart,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

const options = {
   responsive: true,
   plugins: {
      legend: {
         position: "top" as const,
      },
   },
};

const labels = [
   "Январь",
   "",
   "",
   "",
   "Февраль",
   "",
   "",
   "",
   "Март",
   "",
   "",
   "",
   "Апрель",
   "",
   "",
   "",
   "Май",
   "",
   "",
   "",
   "Июнь",
   "",
   "",
   "",
   "Июль",
   "",
   "",
   "",
   "Август",
   "",
   "",
   "",
   "Сентябрь",
   "",
   "",
   "",
   "Октябрь",
   "",
   "",
   "",
   "Ноябрь",
   "",
   "",
   "",
   "Декабрь",
   "",
   "",
   "",
];

export const MarketModalLine = ({ price }: { price: number[] }) => {
   let priceData;

   if (price.length > 48) {
      priceData = price.slice(price.length - 48);
   } else {
      priceData = price;
   }

   const data = {
      labels,
      datasets: [
         {
            label: "цена за шт.",
            data: priceData,
            fill: false,
            borderColor: "rgb(255, 99, 132)",
            lineTension: 0.4,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            // pointHoverBorderWidth: 5,
            pointRadius: 0,
            pointHitRadius: 4,
         },
      ],
   };

   return <Line options={options} data={data} />;
};
