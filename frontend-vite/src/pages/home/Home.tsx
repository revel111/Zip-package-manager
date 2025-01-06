import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import api from "../../app/Api.ts";
import SearchBar from "../../components/home/SearchBar.tsx";
import Frame from "../../components/home/Frame.tsx";
import BigTextEntry from "../../components/enrties/BigTextEntry.tsx";

interface Counts {
    userCount: number;
    zipCount: number;
    typeCount: number;
}

const Home = () => {
    const [counts, setCounts] = useState<Counts | null>(null);

    useEffect(() => {
        const fetch = async () => {
            await api.index.fetchStats()
                .then((response: { data: React.SetStateAction<Counts | null> }) => {
                    setCounts(response.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching stats: ${err}`);
                });
        };

        fetch();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                gap: 3,
                textAlign: "center",
            }}
        >
            <BigTextEntry text={"Upload and download zips!"} align={"center"}/>

            <SearchBar/>

            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <Frame value={counts?.userCount} name="Users"/>
                <Frame value={counts?.zipCount} name="Zips"/>
                <Frame value={counts?.typeCount} name="Types"/>
            </Box>
        </Box>
    );
};

export default Home;