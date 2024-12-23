import {useParams, useNavigate} from "react-router-dom";
import {SetStateAction, useEffect, useState} from "react";
import {Type} from "./AddZip.tsx";
import api from "../../app/Api.tsx";


interface ViewZip {
    id: number;
    name: string;
    user_id: number;
    file_name: string;
    date_of_creation: Date;
    date_of_modification: Date;
}

interface User {
    id: number;
    email: string;
    nickname: string;
    date_of_creation: Date;
    date_of_modification: Date;
}

const ViewZip = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [zip, setZip] = useState<ViewZip | null>(null);
    const [types, setTypes] = useState<Type[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        api.zips.getById(Number(id))
            .then(response => {
                if (response.status === 404) {
                    navigate('/error');
                    return;
                }
                else
                    setZip(response.data);
            })
            .catch((err: Error) => {
                console.error(`Error fetching zip: ${err}`);
            });

        api.zips.getTypesById(Number(id))
            .then(response => {
                setTypes(response.data);
            })
            .catch((err: Error) => {
                console.error(`Error fetching types: ${err}`);
            });
    }, [id, navigate]);

    useEffect(() => {
        if (zip?.user_id) {
            api.users.getById(Number(zip.user_id))
                .then(response => {
                    if (response.status === 200)
                        setUser(response.data);
                })
                .catch((err: Error) => {
                    console.error(`Error fetching user: ${err}`);
                });
        }
    }, [zip]);


    return (<div>
        <div>
            {zip?.name}
            {zip?.file_name}
            {zip?.user_id}
        </div>
        <div>
            {types.map(x => x.id + " " + x.name)}
        </div>
        <div>
            {/*{user.id}*/}
            {/*{user.nickname}*/}
            {/*{user.email}*/}
        </div>
    </div>);
};

export default ViewZip;