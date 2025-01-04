import {Card, CardContent, Typography} from "@mui/material";

const Frame = ({value, name}: { value: number | null | undefined, name: string }) => {
    return (
        <Card sx={{width: 200, padding: 2, textAlign: "center"}}>
            <CardContent>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                    {value ?? "Loading..."}
                </Typography>
                <Typography variant="subtitle1" sx={{marginTop: 1}}>
                    {name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Frame;