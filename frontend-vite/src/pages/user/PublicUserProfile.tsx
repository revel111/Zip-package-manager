import {useContext, useEffect, useState} from "react";
import api from "../../app/Api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography, Paper, Chip, Divider, Button} from "@mui/material";
import {User} from "../zip/ZipPage.tsx";
import {Zip} from "../../components/home/SearchBar.tsx";
import ViewTable, {Column} from "../../components/tables/ViewTable.tsx";
import CustomAvatar from "../../components/decorations/CustomAvatar.tsx";
import {Context} from "../../main.tsx";

const PublicUserProfile = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
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
    ];

    return (
        <Box sx={{padding: 4, maxWidth: "800px", margin: "0 auto"}}>
            <Paper elevation={3} sx={{padding: 4, marginBottom: 4, position: "relative"}}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box>
                        <CustomAvatar/>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {profile?.nickname}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Joined on: {profile?.date_of_creation}
                        </Typography>
                        {isAdmin && (
                            <Chip label="Admin" color="primary" sx={{marginTop: 2}}/>
                        )}
                    </Box>

                    {Number(id) === store.user.id && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/me")}
                            sx={{
                                position: "absolute",
                                right: 16,
                                bottom: 16,
                            }}
                        >
                            Edit
                        </Button>
                    )}
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
                        User has not published any zips yet.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default PublicUserProfile;