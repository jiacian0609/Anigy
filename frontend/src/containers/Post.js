import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from "styled-components";
import _ from "lodash";
import { toast } from "react-toastify";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import { api } from "../api";

const Container = styled.div `
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;

    padding: 50px;

    display: flex;
    gap: 50px;
`

const ImgsContainer = styled.div `
    width: 50%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    text-align: center;
`

const ContentContainer = styled.div `
    // width: 30%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Row = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
`

const Field = styled.div `
    width: 130px;
    padding: 8px 5px;

    background-color: #365A33;
    border-radius: 3px;
    text-align: center;
    font-size: 25px;
    color: #FFFFFF;
`

const Text = styled.div `
    padding: 2px 5px;
    font-size: 25px;
`

const Buttons = styled.div `
    position: absolute;
    right: 20px;

    display: flex;
    gap: 10px;
`

const EditButton = styled.div `
    width: 40px;
    height: 40px;
    background-image: url('/icons/edit.png');
    background-size: contain;
`

const DeleteButton = styled.div `
    width: 40px;
    height: 40px;
    background-image: url('/icons/delete.png');
    background-size: contain;
    cursor: pointer;
`

function Post() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        id: 0,
        animal: '',
        breed: '',
        cover_image: '',
        images: [],
        sex: '',
        age: '',
        neutered: true,
        location: '',
        mobile: '',
        detail: '',
        status: '',
    });

    const onDelete = (post_id) => {
        api.deletePost(post_id)
        .then(res => toast.success(res.message));

        navigate('/manage');
    }
    
    useEffect(() => {
        if (document.getElementsByClassName('thumbs animated')) {
            // console.log(document.getElementsByClassName('thumbs'))
            document.getElementsByClassName('thumbs animated')[0].style.padding = 0;
            // document.getElementsByClassName('thumbs animated')[0].style['transition-duration'] = 0;
            // document.getElementsByClassName('thumbs animated')[0].style.transform = ''
            // document.getElementsByClassName('thumbs animated')[0].style['transition-duration'] = '';
            // document.getElementsByClassName('thumbs')[0].style.transform = ''
            // document.getElementsByClassName('thumbs')[0].style.transition = '';
        }

        api.getPostDetail(id)
        .then(res => {
            setPost({...res.data, role: res.role});
        })
        .catch(err => {
            console.log(err);
            window.location.href = '/404';
        });
    }, [])

    return (
        <Container>
            <ImgsContainer>
                <Carousel infiniteLoop autoPlay>
                    {[post.cover_image, ...post.images].map((img, index) =>
                        <img src={img} alt="img" key={index} />
                    )}
                </Carousel>
            </ImgsContainer>
            <ContentContainer>
                <Row>
                    <Field>動物</Field>
                    <Text>{post.animal}</Text>
                </Row>
                <Row>
                    <Field>品種</Field>
                    <Text>{post.breed}</Text>
                </Row>
                <Row>
                    <Field>性別</Field>
                    <Text>{post.sex === 'M' ? '公' : '母'}</Text>
                </Row>
                <Row>
                    <Field>年齡</Field>
                    <Text>{post.age}</Text>
                </Row>
                <Row>
                    <Field>結紮</Field>
                    <Text>{post.neutered ? '是' : '否'}</Text>
                </Row>
                <Row>
                    <Field>地區</Field>
                    <Text>{post.location}</Text>
                </Row>
                <Row>
                    <Field>聯絡資訊</Field>
                    <Text>{post.contact_content}</Text>
                </Row>
                <Row>
                    <Field>外觀特徵</Field>
                    <Text>{_.isEmpty(post.other_info) ? '無資訊' : post.other_info}</Text>
                </Row>
                <Row>
                    <Field>領養狀態</Field>
                    <Text>{post.status}</Text>
                </Row>
            </ContentContainer>
            {post.role === 'WRITE' &&
                <Buttons>
                    <Link to={`/edit/${post._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                        <EditButton />
                    </Link>
                    <DeleteButton onClick={() => onDelete(post._id)}/>
                </Buttons>
            }
        </Container>
    )
}

export default Post;