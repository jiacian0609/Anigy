import React from "react";
import styled from 'styled-components';

const Container = styled.div `
    width: 1000px;
    height: 500px;
    padding: 30px 50px;
    border: 1px solid #365A33;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 100px; 
`
const Word = styled.h1`
    font-size: 40px;
    font-weight: bold;
    color: #365A33;
    margin-top: 130px;
    margin-left:300px;
`

const Cat = styled.img`
    margin-left: 370px;
    width: 100px;
`

function Notfound() {
    return (
        <Container>
            <Word>找不到此頁面 :(</Word>
            <Cat src='/icons/cat-pot.png'/>
        </Container>
    )
}

export default Notfound