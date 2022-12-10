import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import BigPostButton from "../components/BigPostButton";

const Container = styled.div `
    width: 100%;
    height: 100%;

    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`

const CreateButton = styled.div `
    padding: 15px 50px;
    background-color: #619E5C;
    box-shadow: 0px 3px 3px grey;
    border: solid 3px #000000;
    border-radius: 50px;
    font-size: 20px;
    color: #FFFFFF;

    &:hover {
        background-color: #FFFFFF;
        border: solid 3px #619E5C;
        color: #000000;
    }
`

function Manage() {
    const samplePost = {
        id: 1,
        animal: '貓',
        breed: '混種貓',
        sex: 'F',
        age: '1歲',
        neutered: true,
        location: '台北動物之家',
        mobile: '0900-000-000',
        detail: '下巴有痣',
        status: '開放'
    }
    const [posts, setPosts] = useState([samplePost, samplePost, samplePost]);

    return (
        <Container>
            <Link to='/create' style={{ textDecoration: 'none', color: 'inherit'}}>
                <CreateButton>新增送養貼文</CreateButton>
            </Link>
            {posts.map(p => 
                <BigPostButton 
                    key={p.id}
                    post={p}
                />)}
        </Container>
    )
}

export default Manage;