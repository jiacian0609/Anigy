import React, { useState } from "react";
import styled from 'styled-components';

import PostButton from "../components/PostButton";

const Container = styled.div `
    width: 100%;
    height: 100%;

    padding: 30px;
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

    return (
        <Container>
            {posts.map(p => 
                <PostButton 
                    key={p.id}
                    post={p}
                />)}
        </Container>
    )
}

export default Main;