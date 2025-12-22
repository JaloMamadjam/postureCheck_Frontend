import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function AngleChart({ data }) {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        label: "Ângulo",
        data: data.map((d) => d.angulo),
        borderColor: "blue",
      },
    ],
  };

  return <Line data={chartData} />;
}
