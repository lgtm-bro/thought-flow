import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
	Title,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Title, Legend);

const Trends = (props) => {
  const data = {
    labels: ["Happy", "Anticipation", "Surprised", "Bad", "Fearful", "Angry", "Disgust", "Sad"],
    datasets: [
      {
        label: "",
        data: [12, 19, 3, 5, 2, 3, 1, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
					"rgba(192, 246, 163, 0.5)",
					"rgba(213, 245, 255, 0.8)",
        ],
        borderWidth: 1
      },
    ],
  };

  const options = {
		plugins:{
			title: {
				display: true,
				text: "Feelings Frequency"
			},
			legend: {
				display: true,
				position: "bottom",
				labels: {
					font: {
						size: 10
					},
					usePointStyle: true
				}
			}
		}
  }


  return (<PolarArea data={data} options={options} />)
};

export default Trends;
