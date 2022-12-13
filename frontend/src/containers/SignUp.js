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

const SignInBox = styled.div`
    background-color: white;
    border-radius: 10%;
    width: 40%;
    justify-content: center;
    display: flex;
	flex-direction: column;
	align-items: center;
    margin-top: 100px;
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
    margin-top: 10px;
    margin-bottom: 20px;
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
    margin-top: 20px;
    border: 0px;
`
const Checkbox = styled.label`
    font-size: 20px;
`
const Signin = styled.button`
    text-decoration: underline;
    font-size: 16px;
    border: 0px;
    background: white;
    margin-top: 10px;
`

function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = ( email, username, password) => {
        console.log('username', username);
        var chked = document.querySelectorAll("[type=checkbox]");
        console.log(chked[0].checked);
        if(!chked[0].checked) {
            window.alert('請同意公開資訊')
        }
        
        axios.post("http://localhost:4000/api/signup", {
            "email": email,
            "username": username,
            "password": password,
        })
        .then( (response) => {
			window.localStorage.setItem('JWT', response.data.JWT)
            window.location.href = "/"
		})
		.catch( (error) => {
            console.log(error);
			if(error.response.data.error === 'Username exists.')
				window.alert('會員帳號已存在！')
			else if(error.response.data.error === 'email exists.')
				window.alert('信箱已存在！')
			else window.alert(error.response.data)
		})
    }

    return (
        <Base>
            <Background />
            <Content>
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
                    <Submit onClick={() => handleSubmit(document.getElementById('email').value, document.getElementById('username').value, document.getElementById('password').value)}>註冊</Submit>
                    <Signin onClick={() => navigate('/signin')}>已經有帳號嗎？快來登入吧！</Signin>
                </SignInBox>
            </Content>
        </Base>
    )
}

export default SignUp;