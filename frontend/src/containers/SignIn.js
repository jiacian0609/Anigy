import React from "react";
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Base = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`

const Background = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
`

const Content = styled.div`
    // width: 35%;
    height 100%;
    margin: 0 auto;
    // margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content; center;
`

const Title = styled.h1`
    color: white;
    font-size: 64px;
    font-style: normal;
`

const SignInBox = styled.div`
    background-color: white;
    border-radius: 10%;
    width: 40%;
    justify-content: center;
    display: flex;
	flex-direction: column;
	align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    box-shadow: 0px 3px 5px grey;
`

const InputText = styled.div`
    width: 300px;
    font-size: 20px;
    align-self: left;
    text-align: left;
`

const InputBar = styled.input`
    text-align: left;
    height: 50px;
    font-size: 25px;
    padding-left: 20px;
    border-radius: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    border: 0px;
    background-color: #F1F1F1;
    box-shadow: 0px 3px 3px grey;
`

const Submit = styled.button`
    width: 30%;
    height: 50px;
    font-size: 25px;
    color: white;
    font-weight: bolder;
    background-color: #619E5C;
    border-radius: 50px;
    border: 0px;
    margin-bottom: 10px;
`
const Signup = styled.button`
    text-decoration: underline;
    font-size: 16px;
    border: 0px;
    background: white;
`

function SignIn() {

    const handleSubmit = ( username, password) => {
        console.log('username', username);
        axios.post("http://localhost:8000/login", {
            "username": username,
            "password": password
        })
        .then( (response) => {
			window.localStorage.setItem('JWT', response.data.JWT)
            window.location.href = "/"
		})
		.catch( (error) => {
			if(error.response.data === 'Username does not exist.')
				window.alert('會員帳號不存在！')
			else if(error.response.data === 'Password is wrong :(')
				window.alert('會員密碼錯誤！')
			else window.alert(error.response.data)
		})
    }
    const navigate = useNavigate();



    return (
        <Base>
            <Background/>
            <Content>
                <Title>流浪動物收養平台</Title>
                <SignInBox>
                    <InputText>使用者名稱</InputText>
                    <InputBar id="username"/>
                    <InputText>密碼</InputText>
                    <InputBar id="password" type="password"/>
                    <Submit onClick={() => handleSubmit(document.getElementById('username').value, document.getElementById('password').value)}>登入</Submit>
                    <Signup onClick={() => navigate('/signup')}>還沒有帳號嗎？註冊一個吧！</Signup>
                </SignInBox>
            </Content>
        </Base>
    )
}

export default SignIn;