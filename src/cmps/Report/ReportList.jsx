import { useState } from "react"
import { couponService } from "../../services/coupon.service"
import { ReportFilter } from "./ReportFilter"
import { ReportItem } from "./ReportItem"
import { ReportInfo } from "./ReportInfo"
import { ReportUsageChart } from "./ReportUsageChart"
import { ReportDoughnut } from "./ReportDoughnut"

export function ReportList({coupons}) {
    const [filteredCoupons, setFilteredCoupons] = useState(coupons)
    const [filters, setFilters] = useState({
        username: "",
        startDate: "",
        endDate: ""
    })

    let ths = ["ID","Code", "Description", "Type", "Value", "Usage", "Stackable", "Expiry", "Owner", "Created at"]

    function handleFilterChange(ev) {
        const { name, value } = ev.target
        setFilters({ ...filters, [name]: value })
    }


    async function applyFilters() {
        try {
            let results = coupons;

            if (filters.username) {
                results = await couponService.getCouponsByUser(filters.username)
            }
            if (filters.startDate && filters.endDate) {
                results = await couponService.getCouponsByDateRange(filters.startDate, filters.endDate)
                console.log(results)
            }
            setFilteredCoupons(results)
        } catch (err) {
            console.error("Failed to apply filters:", err);
            throw err
        }
    }
    
    return (
        <div className="report-list-con">
            <section className="report-list-header">
            <h3>Reports</h3>
            <div className="filters">
               <ReportFilter 
                filters={filters}
                handleFilterChange={handleFilterChange}
                applyFilters={applyFilters}
                /> 
            </div>
            </section>
            <div className="report-list">
                    {filteredCoupons.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    {ths.map(t => {
                                        return <th key={t}>{t}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <ReportItem 
                                    filteredCoupons={filteredCoupons}
                                    setFilters={setFilters} 
                                    filters={filters} 
                                    applyFilters={applyFilters}
                                />
                            </tbody>
                        </table>
                    ) : (
                        <p>No coupons found matching your filters.</p>
                    )}
            </div>
            <ReportInfo coupons={coupons}/>
            <section className="charts-con">

                <ReportUsageChart coupons={coupons} />
                <ReportDoughnut coupons={coupons} />
            </section>
        </div>
    )
}