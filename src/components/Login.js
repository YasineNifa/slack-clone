import React from 'react'
import styled from 'styled-components'
import {auth, provider} from '../firebase';



function Login(props) {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            const newUser = {
                name : result.user.displayName,
                photo : result.user.photoURL,
            }
            props.setUser(newUser);
            localStorage.setItem('user',JSON.stringify(newUser));
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
    
    return (
        <Container>
            <Content>

                <SlackImg src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6..1569479844.jpg"/>

                <h1> Sign in Slack </h1>

                <SignInButton onClick={() => signIn()}>
                    Sign In with Google
                </SignInButton>

            </Content>
        </Container>
    )
}

export default Login
const Container = styled.div`
    width : 100%;
    height : 100vh;
    background-color : #f8f8f8;
    display : flex;
    justify-content : center;
    align-items: center;

`

const SlackImg = styled.img`
    height : 100px;
    
`

const Content = styled.div`
    background-color : white;
    padding : 100px;
    border-radius : 5px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`

const SignInButton = styled.button`
    margin-top : 50px;
    background-color : #0a8d48;
    color : white;
    border : none;
    height : 40px;
    border-radius : 4px;
    cursor : pointer;
    font-size : 15px;
`