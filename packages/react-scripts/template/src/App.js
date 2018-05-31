import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

const Container = styled.div`text-align: center;`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`font-size: 1.5em;`;

const Intro = styled.p`font-size: large;`;

class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <img src={logo} className="App-logo" alt="logo" />
          <Title>Welcome to React created with Custom React Scripts!</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </Container>
    );
  }
}

export default App;
