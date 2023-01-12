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

const Trends = ({ getUserSessions }) => {
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    getSessions(sessionStorage.getItem("userId") || 0);
  }, []);

  const getSessions = (userId) => {
    getUserSessions(userId)
      .then((res) => {
        if (res) {
          setKeys(Object.keys(res.data));
          setValues(Object.values(res.data));
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  const data = {
    labels: keys,
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(192, 246, 163, 0.5)",
          "rgba(213, 245, 255, 0.8)"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Feelings Frequency",
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 10,
          },
          usePointStyle: true,
        },
      },
    },
  };

  return (
    <div id="trends-wrapper" className="p-4 pt-5">
      {!!sessionStorage.getItem("userId") && (
        <PolarArea data={data} options={options} />
      )}
      {!sessionStorage.getItem("userId") && (
        <h5 className="text-center">please login to view your trends</h5>
      )}
    </div>
  );
};

export default Trends;
