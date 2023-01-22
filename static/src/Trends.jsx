import React, { useState, useEffect } from "react";
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

const Trends = ({ getUserSessions, emotionColors }) => {
  const [emotions, setEmotions] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getSessions(sessionStorage.getItem("userId") || 0);
  }, []);

  const getSessions = (userId) => {
    getUserSessions(userId)
      .then((res) => {
        if (res) {
          const keys = Object.keys(res.data);
          setEmotions(keys);
          setValues(Object.values(res.data));
          setColors(keys.map((em) => emotionColors[em]));
        }
      })
      .catch((err) => {
        console.log('');
      });
  };

  const data = {
    labels: emotions,
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: colors,
        // [
        //   "rgba(255, 99, 132, 0.5)",
        //   "rgba(54, 162, 235, 0.5)",
        //   "rgba(255, 206, 86, 0.5)",
        //   "rgba(75, 192, 192, 0.5)",
        //   "rgba(153, 102, 255, 0.5)",
        //   "rgba(255, 159, 64, 0.5)",
        //   "rgba(192, 246, 163, 0.5)",
        //   "rgba(213, 245, 255, 0.8)",
        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        font: {
          family: "Nunito",
          size: 24,
        },
        text: "your main vibes",
      },
      legend: {
        display: true,
        position: "left",
        labels: {
          font: {
            size: 11,
          },
        usePointStyle: true,
        },
      },
      circular: false,
    },
  };

  return (
    <div id="trends-wrapper" className="pt-2 rounded">
      {!!sessionStorage.getItem("userId") && (
        <div id="graph-wrapper">
          <PolarArea data={data} options={options} id="graph"/>
        </div>
      )}
      {!sessionStorage.getItem("userId") && (
        <div id="trends-msg" className="text-center">
          <h5 className="text-center">please login to view your trends</h5>
        </div>
      )}
    </div>
  );
};

export default Trends;
