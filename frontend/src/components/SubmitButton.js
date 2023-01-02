import React from "react";
import styled from "styled-components";

const Container = styled.div `
    width: ${props => props.width ? props.width : `60%`};
    margin: 0 auto;
    padding: 15px 50px;
    background-color: #365A33;
    box-shadow: 0px 3px 3px grey;
    border-radius: 50px;
    font-size: 20px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
        background-color: #F2F2F2;
        color: #000000;
    }
`

function SubmitButton({name, width, onClick}) {

    return (
        <Container onClick={onClick} width={width}>
            {name}
        </Container>
    )
}

export default SubmitButton;