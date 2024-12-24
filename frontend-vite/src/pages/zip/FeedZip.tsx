import {useSearchParams} from "react-router-dom";
import {Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import SearchBar, {Zip} from "../components/SearchBar.tsx";

// interface PageZip {
//     name: string
// }

interface Page {
    rows: Zip[];
    totalPages: number,
    totalElements: number;
    page: number;
}

const FeedZip = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<Page>();

    useEffect(() => {
        api.zips.getPaginatedByName(searchParams.get('name'), searchParams.get('page'), searchParams.get('pageSize'))
            .then(r => {
                setPage(r.data);
            })
            .catch((err: Error) => {
                console.error(`Error fetching zips: ${err}`);
            });
    }, [searchParams]);

    return (
        <div>
            <div>
                <SearchBar/>
            </div>

            <div>
                <Pagination count={page?.totalPages} showFirstButton showLastButton>
                </Pagination>
            </div>
        </div>
    )
};


export default FeedZip;