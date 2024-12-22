import {Autocomplete, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import debounce from 'lodash.debounce';
import api from "../../app/Api.tsx";

interface Zip {
    id: number;
    name: string;
}

const SearchBar = () => {
    const [zips, fetchZips] = useState<Zip[]>([]);

    // const fetch = debounce(async (input) => {
    //     await api.zips.getByName().then(x => {
    //
    //     });
    // }, 300);

    return (
        <div>
            <Autocomplete
                disablePortal
                options={zips}
                sx={{width: 300}}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Enter the name"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                )}
            />
        </div>
    );
};


export default SearchBar;