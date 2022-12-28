import React from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

const Icon = styled.div `
    width: 20px;
    height: 20px;

    background-image: url('/icons/${props => props.src}.png');
    background-size: contain;
    background-repeat: no-repeat;
`

const Name = styled.div `
    font-size: 20px;
    color: #000000;
`

const Container = styled.div `
    height: 30px;

    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
        ${Icon} {
            background-image: url('/icons/${props => props.src}-hover.png');
        }
        ${Name} {
            color: #FFFFFF;
        }
    }

    ${props => !props.active} {
        ${Icon} {
            background-image: url('/icons/${props => props.src}-hover.png');
        }
        ${Name} {
            color: #FFFFFF;
        }
    }
`

function HeaderButton({icon, name}) {
    const { pathname } = useLocation();

    function checkActive() {
        if (pathname === '/' && icon === 'main') return true;
        else if ((pathname === '/signIn' || pathname === '/signUp' || pathname === '/signup' || pathname === '/signin' || pathname === '/account') && icon === 'signIn') return true;
        else if (pathname === `/${icon}`) return true;
        else return false;
    }

    return (
        <Container src={icon} active={checkActive()}>
            <Icon src={icon} />
            <Name>{name}</Name>
        </Container>
    )
}

export default HeaderButton;