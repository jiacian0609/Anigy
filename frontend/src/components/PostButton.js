import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div `
    width: 230px;

    margin-top: 40px;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
`

const Img = styled.img `
    width: 160px;
    height: 120px;

    position: absolute;
    z-index: 1;
    
    background-color: #E2E2E2;
`

const ContentBox = styled.div `
    width: 100%;

    margin-top: 60px;
    padding-top: 75px;
    padding-bottom: 20px;

    background-color: #F5F5F5;
    box-shadow: 0px 3px 3px grey;
    border-radius: 10%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const Row = styled.div `
    width: 100%;
    padding: 0 20px;
    display: flex;
    gap: 10px;
`

const Field = styled.div `
    padding: 2px 5px;

    background-color: #365A33;
    border-radius: 3px;
    color: #FFFFFF;
`

const Text = styled.div `
    padding: 2px 5px;
`


function PostButton({ post }) {
    return (
        <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
            <Container>
                <Img alt={post._id} src={post.cover_image} />
                <ContentBox>
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
                </ContentBox>
            </Container>
        </Link>
    )
}

export default PostButton;