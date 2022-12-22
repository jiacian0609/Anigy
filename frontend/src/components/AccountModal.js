import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';


const Content = styled.div`
    width: 600px;
    margin: 0 auto;
    align-items: center;
    border: #619E5C 1px solid;
    border-radius: 30px;
    margin-top: 100px;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
`
const Title = styled.h1`
    color: #619E5C;
    font-size: 30px;
    font-weight: bold;
    width: 300px;
    margin-left: 120px;
`
const SubTitle = styled.div`
    border: #619E5C 1px solid;
    width: 100px;
    height: 40px;
    padding-top: 6px;
    border-radius: 30px;
    text-align: center;
    margin: 20px 0px;
`
const Input = styled.input`
    background-color: #F1F1F1;
    box-shadow: 0px 3px 3px grey;
    border: 0px;
    border-radius: 30px;
    padding: 5px 10px;
    margin-left: 20px;
    height: 30px;
`
const Column = styled.div`
    display: flex;
    align-items: center;
`
const Bt = styled.div`
    padding-left: 150px;
    margin-top: 30px;
`
const CancelBt = styled.button`
    width: 50px;
    height: 30px;
    border-radius: 30px;
    font-weight: bold;
    border: grey 1px solid;
    margin: 0px 30px;
    &:hover {
        background-color: #D9D9D9;
    }
`
const SaveBt = styled.button`
    width: 50px;
    height: 30px;
    border-radius: 30px;
    border: #619E5C 1px solid;
    background: white;
    font-weight: bold;
    &:hover {
        background-color: #619E5C;
        color: #F1F1F1;
    }
`


function Modal() {
    const location = useLocation()
    const navigate = useNavigate()
    console.log('state', location)
    const [name, setName] = useState(location.state.name);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState(location.state.phone);



    const handleSave = () => {
        axios.post("http://localhost:4000/api/account", {
            "username": name,
            "email": email,
            "phone": phone
        })
        .then( (response) => {
			/*window.localStorage.setItem('JWT', response.data.JWT)
            window.location.href = "/"*/
		})
		.catch( (error) => {
			window.alert(error.response.data)
		})
        navigate('/account')
    }
    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleEmailChange = event => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = event => {
        setPhone(event.target.value);
    };

    return (
        <Content>
            <Title>編輯個人資訊</Title>
            <Column>
                <SubTitle>使用者名稱</SubTitle>
                <Input value={name} onChange={handleNameChange}/>
            </Column>
            <Column>
                <SubTitle>電子信箱</SubTitle>
                <Input value={email} onChange={handleEmailChange}/>
            </Column>
            <Column>
                <SubTitle>電話號碼</SubTitle>
                <Input value={phone} onChange={handlePhoneChange}/>
            </Column>
            <Bt>
                <CancelBt onClick={() => navigate('/account')}>取消</CancelBt>
                <SaveBt onClick={() => handleSave()}>確定</SaveBt>
            </Bt>
            
        </Content>
        
    )
}

export default Modal;