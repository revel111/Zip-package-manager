import React, {useContext, useEffect, useState} from "react";
import {
    Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow, TextField, Typography
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {Type} from "../../zip/AddZip.tsx";
import api from "../../../app/Api.ts";
import {Context} from "../../../main.tsx";
import {useNavigate} from "react-router-dom";
import BigTextEntry from "../../../components/enrties/BigTextEntry.tsx";
import CustomSnackBar from "../../../components/textfields/CustomSnackBar.tsx";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog.tsx";

interface Name {
    name: string;
}

interface Delete {
    typeId: number;
    index: number;
}

const Types = () => {
        const {store} = useContext(Context);
        const navigate = useNavigate();
        const [types, setTypes] = useState<Type[]>([]);
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [rowIndex, setRowIndex] = useState(-1);
        const [columnIndex, setColumnIndex] = useState(-1);
        const [addDialogOpen, setAddDialogOpen] = useState(false);
        const [newName, setNewName] = useState<Name>({
            name: ''
        });
        const [deleteType, setDeleteType] = useState<Delete>({typeId: -1, index: -1});
        const [nameErrors, setNameErrors] = useState<Partial<Name>>({});
        const [snackbar, setSnackbar] = useState({
            open: false,
            message: '',
            severity: 'success' as 'success' | 'info' | 'warning' | 'error',
        });
        const [nameSubmitOpen, setNameSubmitOpen] = useState(false);
        const [deleteSubmit, setDeleteSubmit] = useState(false);

        useEffect(() => {
            if (!store.isAuth || !store.isAdmin()) {
                navigate("/unauthorized");
            } else {
                console.log("Authorized Admin");
            }
        }, [store.authChecked, store.isAuth, store.isAdmin, navigate, store]);

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

        const handleDelete = async () => {
            try {
                await api.zipTypes.deleteZipType(deleteType.typeId);
                types.splice(deleteType.index, 1);
                setTypes([...types]);
                showSnackbar('Successfully deleted a type!', 'success');
            } catch(error) {
                showSnackbar('Error', 'error');
            }
        };

        const handleUpdate = async (id: number, name: string, index: number) => {
            await api.zipTypes.updateZipType(id, name)
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
            const fetch = async () => {
                await api.zipTypes.allZipTypes()
                    .then((response: { data: React.SetStateAction<Type[]>; }) => {
                        setTypes(response.data);
                    }).catch((err: Error) => {
                        console.error(`Error fetching types: ${err}`);
                    });
            };
            fetch()
        }, []);

        const handleChange = (e) => {
            const {name, value} = e.target;
            setNewName({
                ...newName,
                [name]: value,
            });
        };

        const validate = (): boolean => {
            const newErrors: Partial<Name> = {};

            if (!newName.name) {
                newErrors.name = 'Name is required';
            } else if (newName.name.length < 2 || newName.name.length > 20) {
                newErrors.name = 'Name should be 2 to 10 symbols.';
            }

            setNameErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleNameSubmit = async () => {
            if (validate())
                try {
                    await api.zipTypes.createZipType(newName.name);
                    setAddDialogOpen(false);
                    setNewName({name: ''})
                    showSnackbar('Successfully added a new type!', 'success');
                } catch (error) {
                    showSnackbar('Such type already exists!', 'error');
                }
        };

        const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
            setSnackbar({open: true, message, severity});
        };

        const handleCloseSnackbar = () => {
            setSnackbar((prev) => ({...prev, open: false}));
        };

        return (
            <div>
                <BigTextEntry text={"Types"} align={"center"}/>
                <Button variant="contained"
                        color="primary"
                        onClick={() => setAddDialogOpen(true)}>
                    Add a new type
                </Button>
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
                                    <TableRow key={type.id}>
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
                                                setDeleteType({typeId: type.id, index: index})
                                                setDeleteSubmit(true);
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

                <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                    <DialogTitle>Add a new type</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            name="name"
                            value={newName.name}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!nameErrors.name}
                            helperText={nameErrors.name}
                        />
                    </DialogContent>
                    <Typography variant="body2">
                        <strong>Name:</strong>
                        <ul>
                            <li>2-20 characters long.</li>
                        </ul>
                    </Typography>

                    <DialogActions>
                        <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                        <Button onClick={() => setNameSubmitOpen(true)} variant="contained">Add</Button>
                    </DialogActions>

                    <ConfirmDialog
                        open={nameSubmitOpen}
                        message={"Do you really want to add a new type?"}
                        onConfirm={() => {
                            setNameSubmitOpen(false);
                            handleNameSubmit();
                        }}
                        onCancel={() => setNameSubmitOpen(false)}
                    ></ConfirmDialog>
                </Dialog>
                <CustomSnackBar
                    open={snackbar.open}
                    message={snackbar.message}
                    severity={snackbar.severity}
                    onClose={handleCloseSnackbar}
                />
                <ConfirmDialog
                    open={deleteSubmit}
                    message={"Do you really want to delete a new type?"}
                    onConfirm={() => {
                        setDeleteSubmit(false);
                        handleDelete();
                        setDeleteType({typeId: -1, index: -1});
                    }}
                    onCancel={() => setDeleteSubmit(false)}
                ></ConfirmDialog>
            </div>
        )
    }
;

export default Types;