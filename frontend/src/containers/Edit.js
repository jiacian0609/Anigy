import React from "react";
import { useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();

    return (
        <h1>Edit {id}</h1>
    )
}

export default Edit;