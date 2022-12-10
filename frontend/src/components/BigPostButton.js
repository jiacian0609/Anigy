import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div `
    width: 65%;

    margin: 0 auto;

    display: flex;
    align-items: center;

    position: relative;
`

const Img = styled.img `
    width: 160px;
    height: 120px;

    position: absolute;

    z-index: 1;
    
    background-color: #303030;
`

const ContentBox = styled.div `
    width: 100%;
    height: 200px;

    margin-left: 60px;
    padding: 20px 0 20px 150px;

    background-color: #F5F5F5;
    box-shadow: 0px 3px 3px grey;
    border-radius: 20px;

    display: flex;
    // flex-direction: column;
    // align-items: center;
    gap: 20px;
`

const Column = styled.div `
    // width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Row = styled.div `
    width: 100%;
    padding: 0 20px;
    display: flex;
    gap: 10px;
`

const Field = styled.div `
    padding: 2px 5px;

    background-color: #619E5C;
    border-radius: 3px;
    color: #FFFFFF;
`

const Text = styled.div `
    padding: 2px 5px;
`

const EditButton = styled.div `
    width: 20px;
    height: 20px;
    background-image: url('/icons/edit.png');
    background-size: contain;

    position: absolute;
    right: 20px;
    top: 20px;
`


function BigPostButton({ post }) {
    return (
        <Container>
            <Img alt={post.id} />
            <ContentBox>
                <Column>
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
                </Column>
                <Column>
                    <Row style={{visibility: 'hidden'}}>
                        <Field>-</Field>
                        <Text></Text>
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
                </Column>
                <Link to={`/edit/${post.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <EditButton />
                </Link>
            </ContentBox>
        </Container>
    )
}

export default BigPostButton;