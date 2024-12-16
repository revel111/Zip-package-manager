import React, {useState} from "react";
import {api} from "../../app/Api.tsx";

const AddZip: React.FC = () => {
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

    const UploadZip = async () => {

    };

    const ChangeZip = async () => {

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
            </form>

            <div>
                <label htmlFor="customName"></label>
            </div>
        </div>
    );
};

export default AddZip;