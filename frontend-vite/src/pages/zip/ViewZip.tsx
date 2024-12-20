import {useParams} from "react-router-dom";

interface ViewZip {
    id: number,
    // name: string,
}

const ViewZip = () => {
    const {id} = useParams();

    return (<div>Empty view zip</div>);
};

export default ViewZip;