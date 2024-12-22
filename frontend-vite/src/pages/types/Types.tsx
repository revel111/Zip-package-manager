import {Type} from "../zip/AddZip.tsx";
import React, {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import {
    Button, ClickAwayListener,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, TextField
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const Types = () => {
    const [types, setTypes] = useState<Type[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rowIndex, setRowIndex] = useState(-1);
    const [columnIndex, setColumnIndex] = useState(-1);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - types.length) : 0;

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

    const handleDelete = (id: number, index: number) => {
        api.zipTypes.deleteZipType(id)
            .then(r => {
                    if (r.status === 200) {
                        types.splice(index, 1);
                        setTypes([...types]);
                    } else {
                        //TODO alert
                        console.log();
                    }
                }
            );
    };

    const handleUpdate = (id: number, name: string, index: number) => {
        api.zipTypes.updateZipType(id, name)
            .then(r => {
                if (r.status == 200) {
                    types[index]["name"] = name;
                    types[index]["date_of_modification"] = r.data.date_of_modification;
                } else {
                    console.log();
                }
            });
    };

    const handleExit = () => {
        setRowIndex(-1);
        setColumnIndex(-1);
    };

    useEffect(() => {
        api.zipTypes.allZipTypes()
            .then((response: { data: React.SetStateAction<Type[]>; }) => {
                setTypes(response.data);
            }).catch((err: Error) => {
            console.error(`Error fetching types: ${err}`);
        });
    }, []);

    return (
        <div>
            <h1>Types: </h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date of creation</TableCell>
                            <TableCell>Date of modification</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : types
                        ).map((type, index) => (
                            <ClickAwayListener onClickAway={() => handleExit()}>
                                <TableRow key={type.name}>
                                    <TableCell component="th" scope="row">
                                        {type.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                               onClick={() => {
                                                   setRowIndex(index);
                                                   setColumnIndex(1);
                                               }}>
                                        {rowIndex === index && columnIndex === 1
                                            ? <TextField
                                                defaultValue={type.name}
                                                onBlur={(e) => handleUpdate(type.id, e.target.value, index)}
                                                // onKeyDown={(e) => {
                                                //     if (e.key === "Enter") {
                                                //         handleExit();
                                                //     }
                                                // }
                                            />
                                            : type.name
                                        }
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {type.date_of_creation}
                                    </TableCell>
                                    <TableCell>
                                        {type.date_of_modification}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Button onClick={() => {
                                            handleDelete(type.id, index);
                                        }}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </ClickAwayListener>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={types.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
};

export default Types;