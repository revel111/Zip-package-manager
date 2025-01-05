import React, {useContext, useEffect, useState} from 'react';
import api from "../../../app/Api.ts";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell, TableContainer, TableFooter,
    TableHead, TablePagination,
    TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {Context} from "../../../main.tsx";
import {useNavigate} from "react-router-dom";

interface User {
    id: number;
    nickname: string;
    email: string;
    date_of_creation: string;
    date_of_modification: string;
}

const Users = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (store.authChecked) {
            if (!store.isAuth || !store.isAdmin()) {
                navigate("/unauthorized");
            } else {
                console.log("Authorized Admin");
            }
        } else
            navigate("/unauthorized");
    }, [store.authChecked, store.isAuth, store.isAdmin, navigate, store]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

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
            api.users.getAll()
                .then((response: { data: React.SetStateAction<User[]>; }) => {
                    setUsers(response.data);
                }).catch((err: Error) => {
                console.error(`Error fetching types: ${err}`);
            });
        }
        fetch();
    }, [])

    const handleDelete = async (id: number, index: number) => {
        await api.users.deleteById(id)
            .then(r => {
                    if (r.status === 200) {
                        users.splice(index, 1);
                        setUsers([...users]);
                    } else {
                        //TODO alert
                        console.log();
                    }
                }
            );
    };

    return (
        <div>
            <h1>Users</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Date of creation</TableCell>
                            <TableCell>Date of modification</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                        ).map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.nickname}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.date_of_creation}
                                </TableCell>
                                <TableCell>
                                    {user.date_of_modification}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => {
                                        handleDelete(user.id, index);
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
                                count={users.length}
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

export default Users;