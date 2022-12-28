import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import PostButton from "../components/PostButton";

import { api } from "../api";

const Container = styled.div `
    width: 100%;
    height: 100%;

    padding: 50px;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

function Main() {
    const samplePost = {
        id: 1,
        animal: '貓',
        breed: '混種貓',
        sex: 'F',
        age: '1歲',
        neutered: true,
        location: '台北動物之家'
    }
    const [posts, setPosts] = useState([samplePost]);

    useEffect(() => {
        api.getAllPost()
        .then(res => setPosts(res.data));
    }, []);

    console.log(posts)

    return (
        <Container>
            {posts.map(p => 
                <PostButton 
                    key={p._id}
                    post={p}
                />)}
        </Container>
    )
}

export default Main;