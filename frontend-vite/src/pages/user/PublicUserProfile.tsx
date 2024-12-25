import {useEffect, useState} from "react";
import api from "../../app/Api.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {User} from "../zip/ZipPage.tsx";
import {Zip} from "../../components/SearchBar.tsx";

const PublicUserProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<User | null>(null);
    const [zips, setZips] = useState<Zip[]>([]);
    const {id} = useParams();

    useEffect(() => {
        api.users.getById(Number(id))
            .then(r => setProfile(r.data))
            .catch((err: Error) => {
                console.error(`Error fetching user: ${err}`);
                navigate('/error');
                return;
            });
    }, [id, navigate]);

    useEffect(() => {
        api.users.getZipsByUserId(Number(id))
            .then(r => setZips(r.data))
            .catch((err: Error) => {
                console.error(`Error fetching zips: ${err}`);
            });
    }, [id]);

    return (
        <div>
            <div>
                {profile?.nickname}
                {profile?.date_of_creation}
            </div>

            <div>
                {zips && zips.length > 0 ?
                    zips.map((x) => (
                        <div>
                            <Link to={`/zips/${x.id}`}>{x.name}</Link><br/>
                        </div>
                    )) : (
                        <div>User didn't publish any zips.</div>
                    )}
            </div>

        </div>
    );
}

export default PublicUserProfile;