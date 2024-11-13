import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CandidateInterface } from "../../types";

// רישום הרכיבים הנדרשים ב-Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics: React.FC = () => {
  const candidates: CandidateInterface[] = useSelector(
    (state: RootState) => state.candidates.candidates
  );
  const candidatesLabel: string[] = candidates.map(
    (candidate: CandidateInterface) => candidate.name
  );
  const candidatesVotes: number[] = candidates.map(
    (candidate: CandidateInterface) => candidate.votes
  );
  const data = {
    labels: candidatesLabel,
    datasets: [
      {
        label: "Votes",
        data: candidatesVotes,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Votes Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Statistics;
