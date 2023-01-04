import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { api } from '../api'


const Content = styled.div`
    width: 600px;
    margin: 50px auto;
    border-radius: 10%;
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 3px 5px grey;
    padding-left: 100px;
`
const Title = styled.h1`
    color: #365A33;
    font-size: 30px;
    font-weight: bold;
    width: 300px;
    margin-left: 120px;
`
const SubTitle = styled.div`
    width: 100px;
    height: 40px;
    padding-top: 20px;
    margin: 10px 20px;
`
const Input = styled.input`
    background-color: #F1F1F1;
    box-shadow: 0px 3px 3px grey;
    border: 0px;
    border-radius: 30px;
    padding: 0px 10px;
    margin-left: 20px;
    height: 30px;
    width: 300px;

    &:focus {
        outline: solid 2px #365A33;
    }
`
const Bt = styled.div`
    padding-left: 250px;
    margin-top: 60px;
`
const CancelBt = styled.button`
    width: 60px;
    height: 35px;
    border-radius: 30px;
    background: white;
    font-weight: bold;
    font-size: 15px;
    border: #365A33 1px solid;
    margin: 0px 30px;
    cursor: pointer;
    &:hover {
        background-color: #365A33;
        color: #F1F1F1;
    }
`
const SaveBt = styled.button`
    width: 60px;
    height: 35px;
    border-radius: 30px;
    border: #365A33 1px solid;
    background: white;
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        background-color: #365A33;
        color: #F1F1F1;
    }
`


function Modal() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState(location.state.name);
    const [email, setEmail] = useState(location.state.email);
    const [mobile, setPhone] = useState(location.state.phone);



    const handleSave = () => {
        api.patchInfo(name, email, mobile)
        .then( (response) => {
            navigate('/account');
		})
		.catch( (error) => {
            console.log(error);
            if (error.response.data.error === "更新失敗") {
                navigate('/account');
            }
		})
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
            <SubTitle>使用者名稱</SubTitle>
            <Input value={name} onChange={handleNameChange}/>
            <SubTitle>電子信箱</SubTitle>
            <Input value={email} onChange={handleEmailChange}/>
            <SubTitle>電話號碼</SubTitle>
            <Input value={mobile} onChange={handlePhoneChange}/>
            <Bt>
                <CancelBt onClick={() => navigate('/account')}>取消</CancelBt>
                <SaveBt onClick={() => handleSave()}>確定</SaveBt>
            </Bt>
            
        </Content>
        
    )
}

export default Modal;