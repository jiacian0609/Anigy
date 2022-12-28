import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";

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
    gap: 12px;
`

const Field = styled.div `
    width: 130px;
    padding: 2px 5px;

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
`

function Post() {
    const samplePost = {
        id: 1,
        animal: '貓',
        breed: '混種貓',
        cover_image: '/images/login_img.png',
        images: ['/images/login_img.png', '/images/login_img.png'],
        sex: 'F',
        age: '1歲',
        neutered: true,
        location: '台北動物之家',
        mobile: '0900-000-000',
        detail: '下巴有痣',
        status: '開放',
    }

    const { id } = useParams();
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

    const user_id = '63a313fca9f8cad1c7f579cc';
    
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
            console.log(res.data);
            setPost(res.data);
        })
        .catch(err => console.log(err));
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
                    <Text>{post.mobile}</Text>
                </Row>
                <Row>
                    <Field>外觀特徵</Field>
                    <Text>{post.detail}</Text>
                </Row>
                <Row>
                    <Field>領養狀態</Field>
                    <Text>{post.status}</Text>
                </Row>
            </ContentContainer>
            {user_id === post.user_id &&
                <Buttons>
                    <Link to={`/edit/${post._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                        <EditButton />
                    </Link>
                    <DeleteButton />
                </Buttons>
            }
        </Container>
    )
}

export default Post;