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
import BigTextEntry from "../../../components/enrties/BigTextEntry.tsx";
import CustomSnackBar from "../../../components/textfields/CustomSnackBar.tsx";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog.tsx";

interface User {
    id: number;
    nickname: string;
    email: string;
    is_admin: string;
    date_of_creation: string;
    date_of_modification: string;
}

export interface ModifyData {
    id: number;
    index: number;
}


const Users = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [modifyData, setModifyData] = useState<ModifyData>({
        id: -1,
        index: -1
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'info' | 'warning' | 'error',
    });
    const [deleteSubmit, setDeleteSubmit] = useState(false);
    const [promoteSubmit, setPromoteSubmit] = useState(false);
    const [demoteSubmit, setDemoteSubmit] = useState(false);

    useEffect(() => {
        if (!store.isAuth || !store.isAdmin()) {
            navigate("/unauthorized");
        } else {
            console.log("Authorized Admin");
        }
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
            await api.users.getAll()
                .then((response: { data: React.SetStateAction<User[]>; }) => {
                    setUsers(response.data);
                }).catch((err: Error) => {
                    console.error(`Error fetching types: ${err}`);
                });
        }
        fetch();
    }, [])

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
        setSnackbar({open: true, message, severity});
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({...prev, open: false}));
    };

    const handleDelete = async () => {
        await api.users.deleteById(modifyData.id)
            .then(r => {
                    if (r.status === 200) {
                        users.splice(modifyData.index, 1);
                        setUsers([...users]);
                        showSnackbar('Successfully deleted a user!', 'success');
                    }
                }
            ).catch(e => {
                showSnackbar('Error has occurred!', 'error');
            });
    };

    const handlePromote = async () => {
        await api.users.promote(modifyData.id)
            .then(r => {
                    users[modifyData.index]["is_admin"] = "Yes";
                    showSnackbar('Successfully promoted a user!', 'success');
                }
            ).catch(e => {
                showSnackbar('User is admin already!', 'error');
            });
    };

    const handleDemote = async () => {
        await api.users.demote(modifyData.id)
            .then(r => {
                    users[modifyData.index]["is_admin"] = "No";
                    showSnackbar('Successfully demoted a user!', 'success');
                }
            ).catch(e => {
                showSnackbar('User is not an admin already!', 'error');
            });
    };

    return (
        <div>
            <BigTextEntry text={"Users"} align={"center"}/>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Admin</TableCell>
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
                                    {user.is_admin}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.date_of_creation}
                                </TableCell>
                                <TableCell>
                                    {user.date_of_modification}
                                </TableCell>
                                {user.id !== store.user.id && (
                                    <>
                                        <TableCell component="th" scope="row">
                                            <Button
                                                onClick={() => {
                                                    setModifyData({id: user.id, index: index});
                                                    setDeleteSubmit(true);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Button
                                                onClick={() => {
                                                    setModifyData({id: user.id, index: index});
                                                    setPromoteSubmit(true);
                                                }}
                                            >
                                                Promote
                                            </Button>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Button
                                                onClick={() => {
                                                    setModifyData({id: user.id, index: index});
                                                    setDemoteSubmit(true);
                                                }}
                                            >
                                                Demote
                                            </Button>
                                        </TableCell>
                                    </>
                                )}
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

            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />

            <ConfirmDialog
                open={deleteSubmit}
                message={"Do you really want to delete a user?"}
                onConfirm={() => {
                    setDeleteSubmit(false);
                    handleDelete();
                    setModifyData({id: -1, index: -1});
                }}
                onCancel={() => setDeleteSubmit(false)}
            />
            <ConfirmDialog
                open={promoteSubmit}
                message={"Do you really want to promote a user?"}
                onConfirm={() => {
                    setPromoteSubmit(false);
                    handlePromote();
                    setModifyData({id: -1, index: -1});
                }}
                onCancel={() => setPromoteSubmit(false)}
            />
            <ConfirmDialog
                open={demoteSubmit}
                message={"Do you really want to demote a user?"}
                onConfirm={() => {
                    setDemoteSubmit(false);
                    handleDemote();
                    setModifyData({id: -1, index: -1});
                }}
                onCancel={() => setDemoteSubmit(false)}
            />
        </div>
    );
};

export default Users;