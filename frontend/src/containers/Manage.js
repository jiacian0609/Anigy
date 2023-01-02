import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import BigPostButton from "../components/BigPostButton";

import { api } from "../api";

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
    background-color: #365A33;
    box-shadow: 0px 3px 3px grey;
    border: solid 3px #000000;
    border-radius: 50px;
    font-size: 20px;
    color: #FFFFFF;

    &:hover {
        background-color: #FFFFFF;
        border: solid 3px #365A33;
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
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            toast.error('請先登入');
            navigate('/signIn');
        }

        api.getUserPost()
        .then(res => setPosts(res.data));
    }, []);

    const onDelete = (post_id) => {
        api.deletePost(post_id)
        .then(res => console.log(res));

        api.getUserPost()
        .then(res => setPosts(res.data));
    }

    return (
        <Container>
            <Link to='/create' style={{ textDecoration: 'none', color: 'inherit'}}>
                <CreateButton>新增送養貼文</CreateButton>
            </Link>
            {posts.length === 0 
                ? <>尚無貼文</>
                : posts.map(p => 
                    <BigPostButton 
                        key={p._id}
                        post={p}
                        onDelete={() => onDelete(p._id)}
                    />)
            }
        </Container>
    )
}

export default Manage;