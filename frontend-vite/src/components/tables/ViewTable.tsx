import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";


export interface Column<T> {
    id: keyof T;
    label: string;
    align?: 'right' | 'left' | 'center';
}

interface ReusableTableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}

const ViewTable = <T,>({
                               data,
                               columns,
                               rowsPerPageOptions = [5, 10, 25],
                               defaultRowsPerPage = 5,
                           }: ReusableTableProps<T>) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const renderCellContent = (value: T[keyof T]): React.ReactNode => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        return value.toString();
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={String(column.id)} align={column.align || 'left'}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data
                    ).map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={String(column.id)} align={column.align || 'left'}>
                                    {renderCellContent(row[column.id])}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={columns.length} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[...rowsPerPageOptions, { label: 'All', value: -1 }]}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default ViewTable;