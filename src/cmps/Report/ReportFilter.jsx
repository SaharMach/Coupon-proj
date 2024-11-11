export function ReportFilter({filters, handleFilterChange, applyFilters}) {
    
    return (
        <>
             <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={filters.username}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                    />
                </label>
                <button onClick={applyFilters}>Apply Filters</button>
        </>
    )
}