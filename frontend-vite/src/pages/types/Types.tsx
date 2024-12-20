import {Type} from "../zip/AddZip.tsx";
import React, {useEffect, useState} from "react";
import api from "../../app/Api.tsx";

const Types = () => {
    const [types, setTypes] = useState<Type[]>([]);

    useEffect(() => {
        api.zipTypes.paginatedZipTypes()
            .then((response: { data: React.SetStateAction<Type[]>; }) => {
                setTypes(response.data);
            }).catch((err: Error) => {
            console.error(`Error fetching types: ${err}`);
        });
    }, []);

    return (
        <div>
            <h1>Types: </h1>
            {/*<table>*/}
            {/*    */}
            {/*</table>*/}
        </div>
    )
};

export default Types;