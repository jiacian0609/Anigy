import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Modal from '../components/AccountModal'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Select, Input } from 'antd';

import SubmitButton from "../components/SubmitButton";

const Container = styled.div `
    width: 100%;
    height: 100%;
    padding-left: 300px;
    margin-top: 50px;
`

const Title = styled.div`
    border: #619E5C 1px solid;
    width: 200px;
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    border-radius: 30px;
    font-weight: bold;
    color: #619E5C;
    padding: 0 auto;
    margin-top: 50px;
`

const Content = styled.div `
    width: 70%;
    display: flex;
    margin-top: 40px;
    align-items: center;
` 

const Value = styled.div`
    background-color: #F1F1F1;
    width: 70%;
    margin-right: 30px;
    border-radius: 30px;
    font-size: 24px;
    padding: 10px 20px;
    box-shadow: 0px 3px 3px grey;
`

const Edit = styled.div`
    margin-left: 400px;
    margin-top: 50px;   
    width: 30px;
    height: 30px;
    background-image: url('/icons/edit.png');
    background-size: contain;
`

const Div = styled.div`
    display: flex;
    align-items: center;
`


function Account() {
    const [name, setName] = useState('fake name');
    const [email, setEmail] = useState('fake email');
    const [phone, setPhone] = useState('fake phone');
    const navigate = useNavigate();

    return (
        <Container>
            <Div>
                <Title>使用者名稱</Title>
                <Edit onClick={() => navigate('/account/Modal', {
                    state: {
                        name: name,
                        email: email,
                        phone: phone,
                    }
                })}/>
            </Div>
            <Content>
                <Value>{name}</Value>
            </Content>
            <Title>電子信箱</Title>
            <Content>
                <Value>{email}</Value>
            </Content>
            <Title>電話號碼</Title>
            <Content>
                <Value>{phone}</Value>
            </Content>
        </Container>
    )
}

export default Account;