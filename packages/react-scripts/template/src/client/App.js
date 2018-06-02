import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({ router: routerReducer }), applyMiddleware(middleware));

const Container = styled.div`text-align: center;`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`font-size: 1.5em;`;

const Intro = styled.p`font-size: large;`;

const Menu = styled.ul`
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }

  li + li {
    margin-top: 10px;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
            <img src={logo} className="App-logo" alt="logo" />
            <Title>Welcome to React created with Custom React Scripts!</Title>
          </Header>
          <ConnectedRouter history={history}>
            <React.Fragment>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <Intro {...props}>
                      To get started, edit <code>src/client/App.js</code> and save to reload.
                    </Intro>
                    <Menu>
                      <li>
                        <Link to="/foo">Foo</Link>
                      </li>
                      <li>
                        <Link to="/bar">Bar</Link>
                      </li>
                      <li>
                        <Link to="/baz">Baz</Link>
                      </li>
                    </Menu>
                  </React.Fragment>
                )}
              />
              <Route path="/foo" render={props => <p>Foo!</p>} />
              <Route path="/bar" render={props => <p>Bar!</p>} />
              <Route path="/baz" render={props => <p>Baz!</p>} />
            </React.Fragment>
          </ConnectedRouter>
        </Container>
      </Provider>
    );
  }
}

export default App;
