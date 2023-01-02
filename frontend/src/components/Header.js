import React from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import _ from "lodash";

import HeaderButton from "./HeaderButton";

const Container = styled.div `
    width: 100%;
    height: 100px;
    z-index: 100;
    padding: 40px;
    background-color: #365A33;

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
    const jwt = localStorage.getItem('JWT');
    console.log('header jwt', jwt)
    return (
        <Container>
            {/* <Logo alt='logo' /> */}
            <Title>Anigy 流浪動物收養平台</Title>
            <Buttons>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='main' name='首頁'/>
                </Link>
                <Link to='/manage' style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='manage' name='我的貼文'/>
                </Link>
                <Link to={_.isNull(jwt) ? '/signIn' : '/account'} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <HeaderButton icon='signIn' name={_.isNull(jwt) ? '登入' : '帳戶管理'}/>
                </Link>
            </Buttons>
        </Container>
    )
}

export default Header;