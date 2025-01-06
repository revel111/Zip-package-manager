import React, {useContext, useEffect, useState} from "react";
import api from "../../app/Api.ts";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import BigTextEntry from "../../components/enrties/BigTextEntry.tsx";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";

interface Type {
    id: number;
    name: string;
}

interface Zip {
    name: string;
    description: string;
    fileName: string;
    file: File | null;
    types: number[];
}

const AddZip: React.FC = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<Zip>>({});
    const [types, setTypes] = useState<Type[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [zip, setZip] = useState<Zip>({
        name: '',
        description: '',
        fileName: '',
        file: null,
        types: [],
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "info" | "warning" | "error",
    });

    const showSnackbar = (message: string, severity: "success" | "info" | "warning" | "error") => {
        setSnackbar({open: true, message, severity});
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({...prev, open: false}));
    };

    useEffect(() => {
        if (!store.isAuth)
            navigate("/login");
    }, [navigate, store.isAuth]);

    useEffect(() => {
        const fetch = async () => {
            await api.zipTypes.getZipTypesByName(searchTerm)
                .then((response: { data: React.SetStateAction<Type[]>; }) => {
                    setTypes(response.data);
                }).catch((err: Error) => {
                    console.error(`Error fetching types: ${err}`);
                });
        }
        fetch();
    }, [searchTerm]);

    const validate = (): boolean => {
        const newErrors: Partial<Zip> = {};

        if (!zip.name) {
            newErrors.name = "Name is required";
        } else if (zip.name.length < 2 || zip.name.length > 20) {
            newErrors.name = "Name should be 2 to 10 symbols.";
        }

        if (!zip.description) {
            newErrors.description = "Description is required";
        } else if (zip.description.length < 20 || zip.description.length > 200) {
            newErrors.description = "Description should be 20 to 200 symbols.";
        }
        //
        // if (!zip.file)
        //     newErrors.fileName = "No file uploaded";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            setZip((prevState) => ({
                ...prevState,
                fileName: file.name,
                file,
            }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setZip((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTypeChange = (event: any, value: Type[]) => {
        setZip((prevState) => ({
            ...prevState,
            types: value.map((v) => v.id),
        }));
    };

    const upload = async () => {
        if (validate()) {
            await api.zips.createZip(zip.name, zip.description, zip.types, zip.file, zip.fileName)
                .then(r => {
                    navigate(`/zips/${r.data.id}`);
                })
                .catch(e => {
                    showSnackbar("Wrong data.", "error");
                });
        }
    };

    return (
        <div>
            <Box sx={{p: 4, maxWidth: 600, mx: "auto"}}>
                <BigTextEntry text={"Upload a new zip file"} align={"center"}/>

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={zip.name}
                    onChange={handleInputChange}
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={zip.description}
                    onChange={handleInputChange}
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <Autocomplete
                    multiple
                    options={types}
                    // Display the name in the dropdown but use id as the unique identifier
                    getOptionLabel={(option) => `${option.name}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id} // Match by id
                    onInputChange={(_event, newInputValue: string) => setSearchTerm(newInputValue)}
                    onChange={handleTypeChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Types" margin="normal" />
                    )}
                />
                <Box sx={{mt: 2, display: "flex", alignItems: "center", gap: 2}}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Select File
                        <input
                            type="file"
                            hidden
                            accept=".zip"
                            onChange={handleFileChange}
                        />
                    </Button>
                    {zip.fileName && (
                        <Typography variant="body2">
                            Selected File: {zip.fileName}
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{mt: 3}}
                    onClick={upload}
                >
                    Upload
                </Button>
            </Box>
            <CustomSnackBar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </div>
    );
};

export {AddZip};
