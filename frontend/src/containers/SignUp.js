import React from "react";
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Base = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
    display: flex;
    align-items: center;
`

const SignInBox = styled.div`
    background-color: white;
    border-radius: 10%;
    width: 40%;
    margin: auto;
    justify-content: center;
    display: flex;
	flex-direction: column;
	align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
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
    background-color: #365A33;
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

    const handleSubmit = ( email, username, password, phone) => {
        console.log('username', username);
        var chked = document.querySelectorAll("[type=checkbox]");
        console.log(chked[0].checked);
        if(!chked[0].checked) {
            window.alert('請同意公開資訊');
            return;
        }
        
        axios.post("http://localhost:4000/api/user/signUp", {
            "email": email,
            "username": username,
            "password": password,
            "mobile": phone
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
                <Submit onClick={() => handleSubmit(document.getElementById('email').value, document.getElementById('username').value, document.getElementById('password').value, document.getElementById('phone').value)}>註冊</Submit>
                <Signin onClick={() => navigate('/signin')}>已經有帳號嗎？快來登入吧！</Signin>
            </SignInBox>
        </Base>
    )
}

export default SignUp;