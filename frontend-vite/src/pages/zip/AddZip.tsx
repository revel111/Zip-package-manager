import {useState} from "react";
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

const UploadZip = async () => {

};


const AddZip = () => {


    return (
        <div>
            <h1>Upload a new zip file</h1>

            <form onSubmit={UploadZip}>
                <input
                    type="file"
                    id="zip_upload"

                />
            </form>
        </div>
    );
};

export default AddZip;