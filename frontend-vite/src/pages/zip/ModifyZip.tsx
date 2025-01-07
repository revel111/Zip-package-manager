import React, {useContext, useEffect, useState} from "react";
import api from "../../app/Api.ts";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import BigTextEntry from "../../components/enrties/BigTextEntry.tsx";
import {Context} from "../../main.tsx";
import {useNavigate, useParams} from "react-router-dom";
import CustomSnackBar from "../../components/textfields/CustomSnackBar.tsx";
import {Zip} from "./AddZip.tsx";
import {Type} from "../admin/tables/Types.tsx";

const ModifyZip: React.FC = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const {id} = useParams();
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
        if (!store.isAuth) navigate("/login");
    }, [navigate, store.isAuth]);

    useEffect(() => {
        const fetchZip = async () => {
            if (id) {
                try {
                    const response = await api.zips.getById(Number(id));
                    setZip(response.data);

                    const typesResponse = await api.zips.getTypesById(Number(id));
                    console.log('Fetched types:', typesResponse.data);
                    setZip((prevState) => ({
                        ...prevState,
                        types: typesResponse.data.map(x => x.id),
                    }));
                } catch (err) {
                    console.error(`Error fetching zip: ${err}`);
                    navigate('/error');
                }
            }
        };
        fetchZip();
    }, [id, navigate]);

    console.log(zip);

    useEffect(() => {
        const fetch = async () => {
            await api.zipTypes.getZipTypesByName(searchTerm)
                .then((response: { data: React.SetStateAction<Type[]>; }) => {
                    setTypes(response.data);
                }).catch((err: Error) => {
                    console.error(`Error fetching types: ${err}`);
                });
        };
        fetch();
    }, [searchTerm]);

    const validate = (): boolean => {
        const newErrors: Partial<Zip> = {};

        if (!zip.name) {
            newErrors.name = "Name is required";
        } else if (zip.name.length < 2 || zip.name.length > 20) {
            newErrors.name = "Name should be 2 to 20 symbols.";
        }

        if (!zip.description) {
            newErrors.description = "Description is required";
        } else if (zip.description.length < 20 || zip.description.length > 200) {
            newErrors.description = "Description should be 20 to 200 symbols.";
        }

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

    const selectedTypes = zip.types ? types.filter((type) => zip.types.includes(type.id)) : [];

    const updateZip = async () => {
        if (validate()) {
            await api.zips.update(zip.name, zip.description, zip.types, zip.file, zip.fileName, Number(id))
                .then(r => {
                    navigate(`/zips/${Number(id)}`);
                })
                .catch(e => {
                    showSnackbar("Failed to update zip.", "error");
                });
        }
    };

    return (
        <div>
            <Box sx={{p: 4, maxWidth: 600, mx: "auto"}}>
                <BigTextEntry text={"Edit Zip File"} align={"center"}/>

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
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onInputChange={(_event, newInputValue: string) => setSearchTerm(newInputValue)}
                    onChange={handleTypeChange}
                    value={selectedTypes}
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
                    onClick={updateZip}
                >
                    Save Changes
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

export {ModifyZip};
