import {Autocomplete, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
// import debounce from 'lodash.debounce';
import api from "../../app/Api.tsx";
import {useNavigate} from "react-router-dom";

export interface Zip {
    id: number;
    name: string;
}

const SearchBar = () => {
    const navigate = useNavigate();
    const [selectedZip, setSelectedZip] = useState<Zip | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [zips, fetchZips] = useState<Zip[]>([]);

    useEffect(() => {
        api.zips.getByName('d')
            .then(response => {
                fetchZips(response.data);
            })
            .catch((err: Error) => {
                console.error(`Error fetching user: ${err}`);
            });
    }, []);

    const handleSearchClick = () => {
        if (selectedZip) {
            navigate(`/zips/${selectedZip.id}`);
        } else {
            console.log('No zip selected or no search term.');
        }
    };

    const handleSelect = (_event: any, newValue: any) => {
        if (newValue) {
            setSelectedZip({id: newValue.id, name: newValue.label});
            navigate(`/zips/${newValue.id}`);
        }
    };

    return (
        <div>
            <Autocomplete
                disablePortal
                options={zips.map(zip => ({label: zip.name, id: zip.id}))}
                getOptionLabel={(option) => option.label}
                value={selectedZip ? {label: selectedZip.name, id: selectedZip.id} : null}
                onChange={handleSelect}
                inputValue={searchTerm}
                onInputChange={(_event, newInputValue: string) => setSearchTerm(newInputValue)}
                sx={{width: 300}}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Enter the name"
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => handleSearchClick}>
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
