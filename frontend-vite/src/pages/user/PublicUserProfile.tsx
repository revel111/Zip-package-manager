import {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import {useNavigate, useParams} from "react-router-dom";

interface Profile {
    id: number;
    email: string;
    nickname: string;
    date_of_creation: string;
    date_of_modification: string;
}

const PublicUserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null);
    const {id} = useParams();

    useEffect(() => {
        api.users.getById(Number(id))
            .then(r => setProfile(r.data))
            .catch((err: Error) => {
                console.error(`Error fetching user: ${err}`);
                navigate('/error');
                return;
            });
    });

    return (
        <div>
            <div>
                {profile?.email}
                {profile?.nickname}
                {profile?.date_of_creation}
            </div>


        </div>
    );
}

export default PublicUserProfile;