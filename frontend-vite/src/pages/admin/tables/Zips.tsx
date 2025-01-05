import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import api from "../../../app/Api.ts";
import {Context} from "../../../main.tsx";
import {useNavigate} from "react-router-dom";

interface Zip {
    id: number;
    name: string;
    user_id: number;
    date_of_creation: string;
    date_of_modification: string;
}

const Zips = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [zips, setZips] = useState<Zip[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (!store.isAuth || !store.isAdmin()) {
            navigate("/unauthorized");
        } else {
            console.log("Authorized Admin");
        }
    }, [store.authChecked, store.isAuth, store.isAdmin, navigate, store]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - zips.length) : 0;

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

    useEffect(() => {
        const fetch = async () => {
            await api.zips.getAll()
                .then((response: { data: React.SetStateAction<Zip[]>; }) => {
                    setZips(response.data);
                }).catch((err: Error) => {
                    console.error(`Error fetching types: ${err}`);
                });
        };

        fetch();
    }, [])

    const handleDelete = (id: number, index: number) => {
        api.zips.deleteById(id)
            .then(r => {
                    if (r.status === 200) {
                        zips.splice(index, 1);
                        setZips([...zips]);
                    } else {
                        //TODO alert
                        console.log();
                    }
                }
            );
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Owner Id</TableCell>
                            <TableCell>Date of creation</TableCell>
                            <TableCell>Date of modification</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? zips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : zips
                        ).map((zip, index) => (
                            <TableRow key={zip.id}>
                                <TableCell component="th" scope="row">
                                    {zip.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {zip.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {zip.user_id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {zip.date_of_creation}
                                </TableCell>
                                <TableCell>
                                    {zip.date_of_modification}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => {
                                        handleDelete(zip.id, index);
                                    }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
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
                                count={zips.length}
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
    );
};

export default Zips;