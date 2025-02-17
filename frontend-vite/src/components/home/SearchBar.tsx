import {Autocomplete, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import api from "../../app/Api.ts";
import {createSearchParams, useNavigate} from "react-router-dom";

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
        const fetch = async() => {
            await api.zips.getByName(searchTerm)
                .then(response => {
                    fetchZips(response.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching user: ${err}`);
                });
        }
        fetch();
    }, [searchTerm]);

    const handleSearchClick = () => {
        if (searchTerm) {
            navigate({
                pathname: `/zips`,
                search: createSearchParams({
                    name: searchTerm
                }).toString()
            });
        }
    };

    const handleSelect = (_event: any, newValue: any) => {
        if (newValue) {
            setSelectedZip({id: newValue.id, name: newValue.label});
            navigate(`/zips/${newValue.id}`);
        }
    };

    return (
        <Autocomplete
            disablePortal
            options={zips.map(zip => ({label: zip.name, id: zip.id}))}
            getOptionLabel={(option) => option.label}
            value={selectedZip ? {label: selectedZip.name, id: selectedZip.id} : null}
            onChange={handleSelect}
            inputValue={searchTerm}
            onInputChange={(_event, newInputValue: string) => setSearchTerm(newInputValue)}
            sx={{width: 500}}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Enter the name"
                    onKeyDown={e => {
                        if (e.code === 'Enter') {
                            handleSearchClick();
                        }
                    }}
                    slotProps={{
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={handleSearchClick}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            )}
        />
    );
};


export default SearchBar;
