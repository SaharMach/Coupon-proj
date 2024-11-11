import { useEffect, useState } from "react";

import { Chart } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export function ReportDoughnut({coupons}) {

    const now = new Date()
    let activeCount = 0
    let expiredCount = 0
    
    coupons.forEach((coupon) => {
        if (new Date(coupon.expiresAt) > now || coupon.expiresAt == null || coupon.expiresAt == "") {
            activeCount++
        } else {
            expiredCount++
        }
    })

    const data = {
        labels: [
            'Active',
          'Expired',
        ],
        datasets: [{
          label: 'Coupons Status',
          data: [activeCount, expiredCount],
          backgroundColor: [
            'rgb(37, 92, 241)',
            'rgb(206, 78, 28)',
          ],
        }],
        options: {
            maintainAspectRatio: false,
        }
      };

    return <div className="report-doughnut">
        <Doughnut data={data}/>
    </div>
}