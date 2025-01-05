import {useEffect, useState} from "react";
import api from "../../app/Api.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Box, Typography, Paper, Chip, Divider} from "@mui/material";
import {User} from "../zip/ZipPage.tsx";
import {Zip} from "../../components/home/SearchBar.tsx";
import ViewTable, {Column} from "../../components/tables/ViewTable.tsx";

const PublicUserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [zips, setZips] = useState<Zip[]>([]);
    const {id} = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.users.getById(Number(id));
                setProfile(response.data);
            } catch (err) {
                console.error(`Error fetching user: ${err}`);
                navigate("/error");
            }
        };

        fetch();
    }, [id, navigate]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.users.isAdmin(Number(id));
                setIsAdmin(response.data);
            } catch (err) {
                console.error(`Error fetching user admin status: ${err}`);
            }
        };

        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await api.users.getZipsByUserId(Number(id));
                setZips(response.data);
            } catch (err) {
                console.error(`Error fetching zips: ${err}`);
            }
        };

        fetch();
    }, [id]);

    const zipColumns: Column<Zip>[] = [
        {id: "id", label: "ID"},
        {id: "name", label: "Name"},
        {
            id: "id",
            label: "Actions",
            align: "center",
            render: (value: number) => (
                <Link to={`/zips/${value}`} style={{textDecoration: "none"}}>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{"&:hover": {textDecoration: "underline"}}}
                    >
                        View
                    </Typography>
                </Link>
            ),
        },
    ];

    return (
        <Box sx={{padding: 4, maxWidth: "800px", margin: "0 auto"}}>
            <Paper elevation={3} sx={{padding: 4, marginBottom: 4}}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {profile?.nickname || "User"}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Joined on: {profile?.date_of_creation || "Unknown"}
                </Typography>
                {isAdmin && (
                    <Chip label="Admin" color="primary" sx={{marginTop: 2}}/>
                )}
            </Paper>

            <Paper elevation={3} sx={{padding: 4}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Published Zips
                </Typography>
                <Divider sx={{marginY: 2}}/>
                {zips.length > 0 ? (
                    <ViewTable data={zips} columns={zipColumns}/>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        User has not published any zips yet.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default PublicUserProfile;