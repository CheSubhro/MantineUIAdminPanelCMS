
import React, { useEffect, useState } from 'react';
import {
    Card,
    EmptyState,
    Badge,
    Tooltip,
    Pagination,
} from '../../../components/common';

export function ReportTable({ data, reportType }) {

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;

    useEffect(() => {
        setCurrentPage(1);
    }, [data, reportType]);

    if (!data || data.length === 0) {
        return (
            <Card className="p-8">
                <EmptyState
                    message="No report data available for the selected filters."
                />
            </Card>
        );
    }

    const headers = Object.keys(data[0]);

    const columnWidths = {
        id: 'w-[5%]',
        title: 'w-[24%]',
        author: 'w-[17%]',
        category: 'w-[15%]',
        views: 'w-[10%]',
        engagement: 'w-[14%]',
        date: 'w-[15%]',
    };

    const formatHeader = (header) => {
        return header
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (character) => character.toUpperCase());
    };

    const totalPages = Math.ceil(data.length / pageSize);

    const startIndex = (currentPage - 1) * pageSize;

    const paginatedData = data.slice(
        startIndex,
        startIndex + pageSize
    );

    return (
        <Card className="overflow-hidden">
            {/* Table Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 bg-gray-50 border-b border-gray-200">
                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        Report View:{' '}
                        <span className="capitalize">
                            {reportType
                                ? reportType.replace(/-/g, ' ')
                                : 'Summary'}
                        </span>
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        Showing {startIndex + 1}–
                        {Math.min(
                            startIndex + pageSize,
                            data.length
                        )}{' '}
                        of {data.length} records
                    </p>
                </div>

                <Badge color="blue">
                    Total Records: {data.length}
                </Badge>
            </div>

            {/* Table */}
            <div
                style={{
                    width: '100%',
                    overflowX: 'auto',
                }}
            >
                <table
                    style={{
                        width: '100%',
                        tableLayout: 'auto',
                        borderCollapse: 'collapse',
                    }}
                >
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className={`
                                        ${columnWidths[header] || 'w-auto'}
                                        px-4
                                        py-3
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                        tracking-wider
                                    `}
                                >
                                    {formatHeader(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedData.map((row, rowIndex) => (
                            <tr
                                key={row.id ?? rowIndex}
                                className="transition-colors hover:bg-gray-50"
                            >
                                {headers.map((header) => {
                                    const value = row[header];

                                    return (
                                        <td
                                            key={header}
                                            style={{
                                                padding: '14px 16px',
                                                fontSize: '14px',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {header === 'status' ||
                                                header === 'engagement' ? (
                                                <Badge color="green">
                                                    {String(value)}
                                                </Badge>
                                            ) : typeof value ===
                                                'object' &&
                                                value !== null ? (
                                                <Tooltip
                                                    content={JSON.stringify(
                                                        value,
                                                        null,
                                                        2
                                                    )}
                                                >
                                                    <button
                                                        type="button"
                                                        className="text-blue-600 underline decoration-dotted"
                                                    >
                                                        View Details
                                                    </button>
                                                </Tooltip>
                                            ) : (
                                                String(value ?? '')
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center sm:justify-end p-4 bg-gray-50 border-t border-gray-200">
                    <Pagination
                        value={currentPage}
                        onChange={setCurrentPage}
                        total={totalPages}
                        color="violet"
                    />
                </div>
            )}
        </Card>
    );
}