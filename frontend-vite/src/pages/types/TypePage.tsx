import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Type} from "../admin/tables/Types.tsx";
import api from "../../app/Api.ts";
import {Zip} from "../../components/home/SearchBar.tsx";
import ViewTable, {Column} from "../../components/tables/ViewTable.tsx";
import {Box, Divider, Paper, Typography} from "@mui/material";
import BigTextEntry from "../../components/enrties/BigTextEntry.tsx";


const TypePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [zips, setZips] = useState<Zip[]>([]);
    const [type, setType] = useState<Type>({
        id: -1,
        name: '',
        date_of_creation: '',
        date_of_modification: '',
    });

    useEffect(() => {
        const fetch = async () => {
            await api.zipTypes.getZipTypeById(Number(id))
                .then(r => {
                    setType(r.data);
                }).catch(e => {
                    navigate("/error");
                });
        };

        fetch();
    }, [id, navigate]);

    useEffect(() => {
        const fetch = async () => {
            await api.zipTypes.getZipsByZipType(Number(id))
                .then(r => {
                    setZips(r.data);
                })
                .catch(e => {
                    console.log(e);
                });
        };

        fetch();
    }, [id]);

    const zipColumns: Column<Zip>[] = [
        {id: "id", label: "ID"},
        {id: "name", label: "Name"},
    ];

    return (
        <Box sx={{padding: 4, maxWidth: "800px", margin: "0 auto"}}>
            <BigTextEntry text="Type" align="center"/>

            <Paper elevation={3} sx={{padding: 4, marginBottom: 4, position: "relative"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {type.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Created on: {type.date_of_creation}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Modified on: {type.date_of_modification}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Paper elevation={3} sx={{padding: 4}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Published Zips
                </Typography>
                <Divider sx={{marginY: 2}}/>
                {zips.length > 0 ? (
                    <ViewTable data={zips} columns={zipColumns} link={`/zips`}/>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Zips under this type have not been published.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default TypePage;