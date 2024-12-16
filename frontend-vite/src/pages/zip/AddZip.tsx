import React, {useEffect, useState} from "react";
import {api} from "../../app/Api.tsx";

interface Type {
    id: string;
    name: string;
}

interface Zip {
    name: string;
    fileName: string;
    blob: Blob;
    types: number[];
}

const AddZip: React.FC = () => {
    const [types, setTypes] = useState<Type[]>([]);

    useEffect(() => {
        api.zipTypes.allZipTypes()
            .then((response: { data: React.SetStateAction<Type[]>; }) => {
                setTypes(response.data);
            }).catch((err: never) => {
            console.error(err);
        });
    }, []);

    const UploadZip = async () => {

    };

    const ChangeZip = async () => {

    };

    const changeType = async () => {

    };

    return (
        <div>
            <h1>Upload a new zip file</h1>

            <form onSubmit={UploadZip}>
                <input
                    type="file"
                    id="zip_upload"
                    accept=".zip"
                    onChange={ChangeZip}
                />

                <div>
                    <h1>Choose types</h1>
                    {types.map((type) => (
                        <label key={type.id}>
                            <input
                                type="checkbox"
                                value={type.id}
                                onChange={changeType}
                            />
                            {type.name}
                        </label>
                    ))}
                </div>

                <div>
                    <label htmlFor="customName"></label>

                </div>
                <button type="submit">Upload</button>
            </form>

        </div>
    );
};

export default AddZip;