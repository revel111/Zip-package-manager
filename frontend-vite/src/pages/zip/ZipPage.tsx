import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, Typography, Box, Chip, Button, Stack} from "@mui/material";
import api from "../../app/Api.ts";
import {Type} from "../admin/tables/Types.tsx";

export interface ViewZip {
    id: number;
    name: string;
    description: string; // Added description
    user_id: number;
    file_name: string;
    date_of_creation: string;
    date_of_modification: string;
}

export interface User {
    id: number;
    email: string;
    nickname: string;
    date_of_creation: string;
    date_of_modification: string;
}

const ZipPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [zip, setZip] = useState<ViewZip>();
    const [types, setTypes] = useState<Type[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchZip = async () => {
            try {
                const response = await api.zips.getById(Number(id));
                setZip(response.data);
            } catch (err) {
                console.error(`Error fetching zip: ${err}`);
                navigate('/error');
            }
        };
        fetchZip();
    }, [id, navigate]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await api.zips.getTypesById(Number(id));
                setTypes(response.data);
            } catch (err) {
                console.error(`Error fetching types: ${err}`);
            }
        };
        fetchTypes();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            if (zip?.user_id) {
                try {
                    const response = await api.users.getById(zip.user_id);
                    setUser(response.data);
                } catch (err) {
                    console.error(`Error fetching user: ${err}`);
                }
            }
        };
        fetchUser();
    }, [zip?.user_id]);

    const handleDownload = async () => {
        await api.zips.download(Number(id))
            .then(r => {
                const blob = new Blob([r.data], {type: 'application/zip'});
                const zipURL = window.URL.createObjectURL(blob);
                const tempLink = document.createElement('a');
                tempLink.href = zipURL;

                tempLink.setAttribute('download', zip?.file_name);
                tempLink.click();

                window.URL.revokeObjectURL(zipURL);
            }).catch(e => {
                console.log(e);
            });
    };

    return (
        <Box sx={{maxWidth: 800, margin: "auto", padding: 4}}>
            <Card variant="outlined" sx={{marginBottom: 3}}>
                <CardHeader title="Zip Details"/>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {zip?.name}
                    </Typography>
                    {zip?.description && (
                        <Typography variant="body1" gutterBottom>
                            {zip.description}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                        Created on: {zip?.date_of_creation}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Last Modified: {zip?.date_of_modification}
                    </Typography>
                    {zip?.file_name && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{mt: 2}}
                            onClick={handleDownload}
                        >
                            Download File
                        </Button>
                    )}
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{marginBottom: 3}}>
                <CardHeader title="Types"/>
                <CardContent>
                    {types && types.length > 0 ? (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {types.map((type) => (
                                <Chip
                                    key={type.id}
                                    label={`${type.name}`}
                                    color="primary"
                                    sx={{mb: 1}}
                                />
                            ))}
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No types available.
                        </Typography>
                    )}
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardHeader title="Owner"/>
                <CardContent>
                    {user ? (
                        <Typography variant="h6">
                            <Link to={`/users/${user.id}`} style={{textDecoration: "none"}}>
                                {user.nickname}
                            </Link>
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            User account was deleted.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default ZipPage;
