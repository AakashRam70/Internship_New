import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
    const [barChartData, setBarChartData] = useState(null);

    useEffect(() => {
        const fetchBarChartData = async () => {
            try {
                const response = await axios.get('http://localhost:4088/api/bar-chart-data');
                const data = response.data;

                const labels = Object.keys(data);
                const values = Object.values(data);

                const chartData = {
                    labels,
                    datasets: [
                        {
                            label: 'Number of Items',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setBarChartData(chartData);
            } catch (error) {
                console.error('Error fetching bar chart data', error);
            }
        };

        fetchBarChartData();
    }, []);

    return (
        <div>
            {barChartData ? <Bar data={barChartData} /> : <p className='text-center'><div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div></p>}
        </div>
    );
};

export default BarChartComponent;
