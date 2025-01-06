import {Card, CardContent} from "@mui/material";
import BigTextEntry from "../enrties/BigTextEntry.tsx";

const Frame = ({value, name}: { value: number | null | undefined, name: string }) => {
    return (
        <Card sx={{width: 200, padding: 2, textAlign: "center"}}>
            <CardContent>
                <BigTextEntry text={value ?? "Loading..."} align={"center"}/>
                <BigTextEntry text={name} align={"center"}/>
            </CardContent>
        </Card>
    );
};

export default Frame;