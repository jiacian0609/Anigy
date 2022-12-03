import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div `
    width: 100%;

    padding: 30px;

    display: flex;
`

const ImgsContainer = styled.div `
    width: 50%;
    height: 100%;
`

const ContentContainer = styled.div `
    width: 50%;
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

    background-color: #619E5C;
    text-align: center;
    font-size: 25px;
    color: #FFFFFF;
`

const Text = styled.div `
    padding: 2px 5px;
    font-size: 25px;
`

function Post() {
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

    const { id } = useParams();
    const [post, setPost] = useState(samplePost);

    return (
        <Container>
            <ImgsContainer></ImgsContainer>
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
        </Container>
    )
}

export default Post;