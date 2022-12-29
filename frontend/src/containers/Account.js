import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div `
    width: 100%;
    height: 100%;
    padding-left: 300px;
    margin-top: 50px;
`

const Title = styled.div`
    width: 200px;
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    margin-top: 50px;
`

const Content = styled.div `
    width: 40%;
    display: flex;
    margin-top: 40px;
    align-items: center;
` 

const Value = styled.div`
    background-color: #F1F1F1;
    width: 100%;
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
const Logout = styled.button`
    background-color: white;
    border-radius: 30px;
    width: 60px;
    height: 40px;
    border: 2px solid #365A33;
    color: #365A33;
    font-weight: bold;
    font-size: 20px;
    margin-left: 210px;
    margin-top: 40px;
    &:hover {
        background-color: #365A33;
        color: #F1F1F1;
    }
`

function Account() {
    const [name, setName] = useState('fake name');
    const [email, setEmail] = useState('fake email');
    const [phone, setPhone] = useState('fake phone');
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = window.localStorage.getItem("JWT")
        axios.get("http://localhost:4000/api/account", { headers: { Authorization: 'Bearer ' + jwt } })
        .then(res => {
            console.log(res.data);
            const {username, email, mobile} = res.data.info
            setName(username)
            setEmail(email)
            setPhone(mobile)
        })
    })

    const signOut = () => {
        //console.log(window.localStorage.getItem("JWT"));
        window.localStorage.removeItem("JWT");
        window.location = '/';
        //console.log(window.localStorage.getItem("JWT"));
    }

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
            <Div>
                <Content>
                    <Value>{phone}</Value>
                </Content>
                <Logout onClick={() => signOut()}>登出</Logout>
            </Div>
        </Container>
    )
}

export default Account;