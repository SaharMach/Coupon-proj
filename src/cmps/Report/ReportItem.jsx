import { utilService } from "../../services/util.services"


export function ReportItem({filteredCoupons, setFilters, filters, applyFilters}) {


    return (
        <>
            {filteredCoupons.map((c) => (
                <tr key={c._id} className="report-item">
                    <td className="report-_id">{c._id}</td>
                    <td className="report-code">{c.code}</td>
                    <td className="report-details">{c.desc}</td>
                    <td className="report-type">{c.discount.type}</td>
                    <td className="report-value">{c.discount.value}</td>
                    <td className="report-usage">
                        <strong>Usage:</strong> {c.used.count}/{c.usageLimit} times
                    </td>
                    <td className="report-stackable">{c.stackable ? 'Yes' : 'No'}</td>
                    <td className="report-expiry">
                        {c.expiresAt ? utilService.formatDate(new Date(c.expiresAt).toLocaleDateString()) : 'Unlimited'}
                    </td>
                    <td className="report-owner" onClick={() => {
                        filters.username = c.createdBy.username
                        setFilters(filters) 
                        applyFilters()
                    }}>{c.createdBy.username}</td>
                    <td className="report-at">{utilService.formatDate(new Date(c.createdBy.at).toLocaleDateString())}</td>
                </tr>
        ))}
        </>
    )
}