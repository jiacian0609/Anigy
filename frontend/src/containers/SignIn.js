import React from "react";
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from '../api'

const Base = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
    display: flex;
    align-items: center;
`

const SignInBox = styled.div`
    border-radius: 10%;
    width: 40%;
    margin: auto;
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
    background-color: #365A33;
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
    const navigate = useNavigate();

    const handleSubmit = ( username, password) => {
        api.signIn(username, password)
        .then(response => {
			window.localStorage.setItem('JWT', response.JWT);
            toast.success('登入成功');
            navigate('/');
		})
		.catch(error => console.log(error))
        // console.log('username', username);
    }
    
    return (
        <Base>
            <SignInBox>
                <InputText>使用者名稱</InputText>
                <InputBar id="username"/>
                <InputText>密碼</InputText>
                <InputBar id="password" type="password"/>
                <Submit onClick={() => handleSubmit(document.getElementById('username').value, document.getElementById('password').value)}>登入</Submit>
                <Signup onClick={() => navigate('/signup')}>還沒有帳號嗎？註冊一個吧！</Signup>
            </SignInBox>
        </Base>
    )
}

export default SignIn;