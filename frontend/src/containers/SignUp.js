import React from "react";
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { api } from '../api'
import { toast } from "react-toastify";

import SubmitButton from "../components/SubmitButton";

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
    width: 300px;
    font-size: 20px;
    align-self: left;
    text-align: left;
`

const InputBar = styled.input`
    width: 100%;
    text-align: left;
    font-size: 15px;
    line-height: 20px;
    padding: 10px 20px;
    border-radius: 50px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 0px;
    background-color: #F1F1F1;
    box-shadow: 0px 3px 3px grey;

    &:focus {
        outline: solid 2px #365A33;
    }
`

const Submit = styled.button`
    width: 30%;
    height: 50px;
    font-size: 25px;
    color: white;
    font-weight: bolder;
    background-color: #365A33;
    border-radius: 50px;
    margin-top: 20px;
    border: 0px;
`
const Checkbox = styled.label`
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
`
const Signin = styled.button`
    text-decoration: underline;
    font-size: 16px;
    border: 0px;
    background: white;
    margin-top: 10px;
    cursor: pointer;

    &:hover {
        color: #365A33;
    }
`

function SignUp({setJwt}) {
    const navigate = useNavigate();

    const handleSubmit = ( email, username, password, phone) => {
        console.log('username', username);
        var chked = document.querySelectorAll("[type=checkbox]");
        console.log(chked[0].checked);
        if(!chked[0].checked) {
            toast.error('請同意公開資訊');
            return;
        }
        api.signUp(email, username, password, phone)
        .then(response => {
			window.localStorage.setItem('JWT', response.JWT);
            setJwt(response.JWT);
            toast.success(response.message);
            navigate('/');
		})
		.catch(error => console.log(error))
    }

    return (
        <Base>
            <SignInBox>
                <InputText>使用者名稱</InputText>
                <InputBar id="username"/>
                <InputText>密碼</InputText>
                <InputBar id="password" type="password"/>
                <InputText>電子信箱</InputText>
                <InputBar id="email"/>
                <InputText>電話號碼</InputText>
                <InputBar id="phone"/>
                <Checkbox>
                    <input type='checkbox' value='我同意公開聯絡電話和信箱'/>
                    <span>我同意公開聯絡電話和信箱</span>
                </Checkbox>
                <SubmitButton name='註冊' width='50%' onClick={() => handleSubmit(document.getElementById('email').value, document.getElementById('username').value, document.getElementById('password').value, document.getElementById('phone').value)} />
                <Signin onClick={() => navigate('/signin')}>已經有帳號嗎？快來登入吧！</Signin>
            </SignInBox>
        </Base>
    )
}

export default SignUp;