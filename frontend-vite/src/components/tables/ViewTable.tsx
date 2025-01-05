import React from 'react';
import {
    Button,
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
import {useNavigate} from "react-router-dom";

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
    link: string;
}

const ViewTable = <T, >({
                            link,
                            data,
                            columns,
                            rowsPerPageOptions = [5, 10, 25],
                            defaultRowsPerPage = 5,
                        }: ReusableTableProps<T>) => {
    const navigate = useNavigate();
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

    const renderCellContent = (
        value: T[keyof T],
    ): React.ReactNode => {
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
                        <TableCell align="center">Links</TableCell>
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
                            <TableCell align="center">
                                <Button
                                    onClick={() => navigate(`${link}/${row.id}`)} // Navigate using row.id
                                    variant="contained"
                                    color="primary"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[...rowsPerPageOptions, {label: 'All', value: -1}]}
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
