import { useState } from "react"
import { couponService } from "../../services/coupon.service"
import { ReportFilter } from "./ReportFilter"
import { ReportItem } from "./ReportItem"
import { ReportInfo } from "./ReportInfo"
import { ReportUsageChart } from "./ReportUsageChart"
import { ReportDoughnut } from "./ReportDoughnut"
import { utils, writeFile } from "xlsx"
import toast from "react-hot-toast"
export function ReportList({coupons}) {
    const [filteredCoupons, setFilteredCoupons] = useState(coupons)
    const [filters, setFilters] = useState({
        username: "",
        startDate: "",
        endDate: ""
    })

    let ths = ["ID","Code", "Description", "Type", "Value", "Usage", "Stackable", "Expiry", "Owner", "Created at"]

    function handleFilterChange(e) {
        const { name, value } = e.target
        setFilters({ ...filters, [name]: value })
    }


    async function applyFilters() {
        try {
            let results = coupons;

            if (filters.username && filters.startDate && filters.endDate) {
                const userCoupons = await couponService.getCouponsByUser(filters.username)
                results = await couponService.getCouponsByDateRange(
                    filters.startDate, 
                    filters.endDate,
                    userCoupons 
                )
            }
            else if (filters.username) {
                results = await couponService.getCouponsByUser(filters.username)
            }
            else if (filters.startDate && filters.endDate) {
                results = await couponService.getCouponsByDateRange(filters.startDate, filters.endDate)
            }

            setFilteredCoupons(results)
        } catch (err) {
            console.error("Failed to apply filters:", err);
            throw err
        }
    }

    function exportToExcel() {
        const data = filteredCoupons.map((c) => ({
          ID: c._id,
          Code: c.code,
          Description: c.desc,
          Type: c.discount.type,
          Value: c.discount.value,
          Usage: `${c.used.count}/${c.usageLimit} times`,
          Stackable: c.stackable ? "Yes" : "No",
          Expiry: c.expiresAt
            ? new Date(c.expiresAt).toLocaleDateString()
            : "Unlimited",
          Owner: c.createdBy.username,
          "Created At": new Date(c.createdBy.at).toLocaleDateString(),
        }))
        const worksheet = utils.json_to_sheet(data)
        const workbook = utils.book_new()

        utils.book_append_sheet(workbook, worksheet, "Coupons")
        writeFile(workbook, "Coupons_Report.xlsx")
        toast.success("Excel file created!")
      }
    
    
    return (
        <div className="report-list-con">
            <section className="report-list-header">
                <section>
                    <h3>Reports</h3>
                    <button onClick={exportToExcel}>Export to excel
                    <span className="material-symbols-outlined">
                        file_export
                    </span>
                    </button>
                </section>
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