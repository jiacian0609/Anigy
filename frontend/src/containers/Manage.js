import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import BigPostButton from "../components/BigPostButton";
import SubmitButton from "../components/SubmitButton";

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

function Manage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const onDelete = async (post_id) => {
        await api.deletePost(post_id)
        .then(res => toast.success(res.message));

        await api.getUserPost()
        .then(res => setPosts(res.data));
    }

    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            toast.error('請先登入');
            navigate('/signIn');
        }

        api.getUserPost()
        .then(res => setPosts(res.data));
    }, []);

    return (
        <Container>
            <SubmitButton name='新增送養貼文' width='25%' onClick={() => navigate('/create')} />
            {posts.length === 0 
                ? <>尚無貼文</>
                : posts.map(p => 
                    <BigPostButton 
                        key={p._id}
                        post={p}
                        onDelete={() => onDelete(p._id)}
                        onClick={() => navigate(`/post/${p._id}`)}
                    />)
            }
        </Container>
    )
}

export default Manage;