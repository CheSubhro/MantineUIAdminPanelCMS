
import React from 'react';
import {
    Card,
    CustomSelect,
    Button,
    Input,
} from '../../../components/common';

export function ReportFilters({
    reportType,
    setReportType,
    timeRange,
    setTimeRange,
    searchQuery,
    setSearchQuery,
    onExportCSV,
    onExportPDF,
}) {
    return (
        <Card className="mb-6 p-5">

            {/* Report Type */}
            <div style={{ marginBottom: '16px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Report Type
                </label>

                <CustomSelect
                    value={reportType}
                    onChange={setReportType}
                    data={[
                        {
                            label: 'Post Performance',
                            value: 'post-performance',
                        },
                        {
                            label: 'Author Contribution',
                            value: 'author-contribution',
                        },
                        {
                            label: 'Category Breakdown',
                            value: 'category-breakdown',
                        },
                        {
                            label: 'Traffic Summary',
                            value: 'traffic-summary',
                        },
                        {
                            label: 'Activity Log',
                            value: 'activity-log',
                        },
                    ]}
                />
            </div>

            {/* Period */}
            <div style={{ marginBottom: '16px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Period
                </label>

                <CustomSelect
                    value={timeRange}
                    onChange={setTimeRange}
                    data={[
                        {
                            label: 'Last 7 Days',
                            value: '7days',
                        },
                        {
                            label: 'Last 30 Days',
                            value: '30days',
                        },
                        {
                            label: 'Past Year',
                            value: '1year',
                        },
                    ]}
                />
            </div>

            {/* Search */}
            <div style={{ marginBottom: '14px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '7px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Search Report
                </label>

                <Input
                    type="text"
                    placeholder="Search by title, author or category..."
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.target.value)
                    }
                />
            </div>

            {/* Buttons */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '8px',
                }}
            >
                <Button
                    color="violet"
                    variant="filled"
                    onClick={onExportCSV}
                >
                    Export CSV
                </Button>

                <Button
                    color="violet"
                    variant="light"
                    onClick={onExportPDF}
                >
                    Export PDF
                </Button>
            </div>

        </Card>
    );
}