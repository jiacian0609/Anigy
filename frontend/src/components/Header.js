import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import HeaderButton from "./HeaderButton";

const Container = styled.div `
    width: 100%;
    height: 100px;
    z-index: 1;
    padding: 10px;
    background-color: #619E5C;

    display: flex;
    align-items: center;
    gap: 10px;

    position: fixed;
`

const Logo = styled.img `
    width: 80px;
    height: 80px;
    margin-left: 15px;
    background-color: #FFFFFF;
`

const Title = styled.div `
    font-size: 33px;
    color: #FFFFFF;
`

const Buttons = styled.div `
    display: flex;
    gap: 50px;

    position: absolute;
    right: 80px;
    bottom: 18px;
`

function Header() {
    return (
        <Container>
            <Logo alt='logo' />
            <Title>流浪動物收養平台</Title>
            <Buttons>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='main' name='首頁'/>
                </Link>
                <Link to='/manage' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='manage' name='我的貼文'/>
                </Link>
                <Link to='/signIn' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='signIn' name='登入'/>
                </Link>
            </Buttons>
        </Container>
    )
}

export default Header;