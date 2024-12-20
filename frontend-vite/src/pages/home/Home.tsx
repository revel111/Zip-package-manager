import React, {useEffect, useState} from "react";
import api from "../../app/Api.tsx";

interface Counts {
    userCount: number,
    zipCount: number,
    typeCount: number,
}

const Home = () => {
    const [counts, setCounts] = useState<Counts | null>(null);

    useEffect(() => {
        api.index.fetchStats()
            .then((response: { data: React.SetStateAction<Counts | null>; }) => {
                setCounts(response.data);
            }).catch((err: Error) => {
            console.error(`Error fetching stats: ${err}`);
        });
    }, []);

    return (
        <div>
            <div>
                <p>
                    Users:
                    {counts?.userCount}
                </p>
            </div>
            <div>
                <p>
                    Zips:
                    {counts?.zipCount}
                </p>
            </div>
            <div>
                <p>
                    Types:
                    {counts?.typeCount}
                </p>
            </div>
        </div>
    );
};

export default Home;