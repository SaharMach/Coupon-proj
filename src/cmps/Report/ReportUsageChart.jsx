import { useEffect, useState } from "react";

import { couponService } from "../../services/coupon.service";

import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

export function ReportUsageChart({coupons}) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Monthly usage",
                data: [],
            },
        ],
    });

    useEffect(() => {
        getUsageData()
    }, [])

    function getUsageData() {
        const usageData = couponService.getUsageData(coupons)
        console.log(usageData);

        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "Monthly usage",
                    data: usageData,
                }
            ]
        }
        setChartData(data)
    }

    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1,  
                },
            },
        },
        maintainAspectRatio: false,
    };
    
    return (
        <div className="report-usage-chart" >
        {chartData.datasets && chartData.datasets[0].data.length > 0 ? (
            <Bar data={chartData} options={options} />
        ) : (
            <p>Loading chart...</p>
        )}
    </div>
    )

}