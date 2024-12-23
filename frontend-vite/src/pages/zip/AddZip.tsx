import React, {useEffect, useState} from "react";
import api from "../../app/Api.tsx";

interface Type {
    id: number;
    name: string;
    date_of_creation: string;
    date_of_modification: string;
}

interface Zip {
    name: string;
    fileName: string;
    file: File | null;
    types: number[];
}

const AddZip: React.FC = () => {
    const [types, setTypes] = useState<Type[]>([]);
    const [zipData, setZipData] = useState<Zip>({
        name: '',
        fileName: '',
        file: null,
        types: [],
    });

    useEffect(() => {
        api.zipTypes.allZipTypes()
            .then((response: { data: React.SetStateAction<Type[]>; }) => {
                setTypes(response.data);
            }).catch((err: Error) => {
            console.error(`Error fetching types: ${err}`);
        });
    }, []);

    const Upload = async () => {
        try {
            console.log(zipData);
            const response = await api.zips.createZip(
                zipData.name,
                zipData.types,
                zipData.file,
                zipData.fileName
            );
        } catch (err) {
            console.error(`Error uploading file: ${err}`);
        }
    };

    const ChangeZip = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file)
            setZipData((prev) => ({
                ...prev,
                fileName: file.name,
                file: file,
            }));
    };

    const changeType = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = Number(event.target.value);
        setZipData((prev) =>
            ({
                ...prev,
                types: event.target.checked
                    ? [...prev.types, id]
                    : prev.types.filter((x) => x !== id)
            }));
    };

    const changeName = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setZipData((prev) =>
            ({
                ...prev,
                name: name,
            }));
    };

    return (
        <div>
            <h1>Upload a new zip file</h1>

            <form onSubmit={Upload}>
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
                    <label htmlFor="customName">Enter the name of upload</label>
                    <input
                        id="customName"
                        type="text"
                        name="customName"
                        onChange={changeName}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export {AddZip};
export type { Type };