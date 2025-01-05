import {useParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Type} from "./AddZip.tsx";
import api from "../../app/Api.ts";


export interface ViewZip {
    id: number;
    name: string;
    user_id: number;
    file_name: string;
    date_of_creation: string;
    date_of_modification: string;
}

export interface User {
    id: number;
    email: string;
    nickname: string;
    date_of_creation: string;
    date_of_modification: string;
}

const ZipPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [zip, setZip] = useState<ViewZip>();
    const [types, setTypes] = useState<Type[]>([]);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetch = async () => {
            await api.zips.getById(Number(id))
                .then(response => {
                    setZip(response.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching zip: ${err}`);
                    navigate('/error');
                    return;
                });
        };

        fetch();
    }, [id, navigate]);

    useEffect(() => {
        const fetch = async () => {
            await api.zips.getTypesById(Number(id))
                .then(response => {
                    setTypes(response.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching types: ${err}`);
                });
        };
        fetch();
    }, [id]);

    useEffect(() => {
        const fetch = async () => {
            if (zip?.user_id) {
                api.users.getById(zip.user_id)
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch((err: Error) => {
                        console.error(`Error fetching user: ${err}`);
                    });
            }
        };
    }, [zip?.user_id]);

    return (
        <div>
            <div>
                <h1>Zip:</h1>
                {zip?.name} <br/>
            </div>
            <div>
                {types && types.length > 0 ? (
                    <>
                        <h1>Types</h1>
                        {types.map((x) => (
                            <div key={x.id}>{x.id} {x.name}</div>
                        ))}
                    </>
                ) : (
                    <div>No types available</div>
                )}
            </div>
            <div>
                {user ? (
                    <>
                        <h1>User:</h1>
                        <Link to={`/users/${user?.id}`}>{user?.nickname}</Link>
                    </>
                ) : (
                    <div>User account was deleted.</div>
                )}
            </div>
        </div>);
};

export default ZipPage;