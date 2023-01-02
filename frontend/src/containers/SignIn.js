import React from "react";
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SubmitButton from "../components/SubmitButton";

import { api } from '../api';

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
    padding: 50px 80px;
    margin: auto;
    justify-content: center;
    display: flex;
	flex-direction: column;
    box-shadow: 0px 3px 5px grey;
`

const InputText = styled.div`
    font-size: 20px;
    text-align: left;
`

const InputBar = styled.input`
    width: 100%;
    text-align: left;
    font-size: 15px;
    line-height: 20px;
    padding: 10px 20px;
    border-radius: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
    border: 0px;
    background-color: #F1F1F1;
    box-shadow: 0px 3px 3px grey;
`

const Signup = styled.button`
    margin-top: 20px;
    text-decoration: underline;
    font-size: 16px;
    border: 0px;
    background: white;
    cursor: pointer;

    &:hover {
        color: #365A33;
    }
`

function SignIn() {
    const navigate = useNavigate();

    const handleSubmit = ( username, password) => {
        api.signIn(username, password)
        .then(response => {
            console.log(response.JWT);
			localStorage.setItem('JWT', response.JWT);
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
                <SubmitButton name='登入' width='50%' onClick={() => handleSubmit(document.getElementById('username').value, document.getElementById('password').value)} />
                <Signup onClick={() => navigate('/signup')}>還沒有帳號嗎？註冊一個吧！</Signup>
            </SignInBox>
        </Base>
    )
}

export default SignIn;