import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../api";

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

function Account({setJwt}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('JWT')) {
            toast.error('請先登入');
            navigate('/signIn');
        }

        const jwt = window.localStorage.getItem("JWT")
        api.getInfo(jwt)
        .then(res => {
            const {username, email, mobile} = res.info;
            setName(username);
            setEmail(email);
            setPhone(mobile);
        })
        .catch(err => {
            console.log(err);
            if (err.response.data) {
                toast.error(err.response.data.error);
                if (err.response.data.error === '請重新登入') {
                    setJwt('');
                    localStorage.removeItem('JWT');
                    navigate('/signIn');
                }
            }
            else toast.error(err);
        });
    })

    const signOut = () => {
        window.localStorage.removeItem("JWT");
        setJwt('');
        toast.success('登出成功');
        navigate('/');
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