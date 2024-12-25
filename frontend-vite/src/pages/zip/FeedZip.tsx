import {Link, useSearchParams} from "react-router-dom";
import {Pagination, PaginationItem} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import SearchBar, {Zip} from "../../components/SearchBar.tsx";

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
                {page?.rows.length > 0 ?
                    page?.rows.map((x) => (
                        <div>
                            <Link to={`/zips/${x.id}`}>{x.name}</Link><br/>
                        </div>
                    )) : (
                        <div>Results not found </div>
                    )}
            </div>

            <div>
                <Pagination count={page?.totalPages}
                            page={page?.page}
                            showFirstButton showLastButton
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/zips${item.page === 1 ? '' : `?page=${item.page}`}`}
                                    {...item}
                                />
                            )}
                />
            </div>
        </div>
    );
};

export default FeedZip;