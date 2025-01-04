import {Link, useSearchParams} from "react-router-dom";
import {Pagination, PaginationItem, Box, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import SearchBar, {Zip} from "../../components/home/SearchBar.tsx";

interface Page {
    rows: Zip[];
    totalPages: number;
    totalElements: number;
    page: number;
}

const FeedZip = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<Page>();

    useEffect(() => {
        const fetch = async () => {
            await api.zips.getPaginatedByName(searchParams.get('name'), searchParams.get('page'), searchParams.get('pageSize'))
                .then(r => {
                    setPage(r.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching zips: ${err}`);
                });
        };

        fetch();
    }, [searchParams]);

    return (
        <div>
            <div style={{marginBottom: '20px'}}>
                <SearchBar/>
            </div>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>
                {page?.rows.length > 0 ? (
                    page?.rows.map((x, index) => (
                        <Link
                            key={x.id}
                            to={`/zips/${x.id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5',
                                padding: 2,
                                borderRadius: '8px',
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                },
                                transition: '0.3s',
                            }}>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#1976d2',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {x.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#555',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Additional details or descriptions could go here.
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Link>
                    ))
                ) : (
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#555',
                        }}
                    >
                        Results wasn't found.
                    </Typography>
                )}
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'left', marginTop: '20px'}}>
                <Pagination
                    count={page?.totalPages}
                    page={page?.page}
                    showFirstButton
                    showLastButton
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/zips${item.page === 1 ? '' : `?page=${item.page}`}`}
                            {...item}
                            sx={{
                                padding: '8px 16px',
                                fontSize: '1.1rem',
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: '#f1f1f1',
                                },
                            }}
                        />
                    )}
                />
            </Box>
        </div>
    );
};

export default FeedZip;