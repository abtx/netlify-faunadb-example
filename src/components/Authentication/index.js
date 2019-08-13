import React from 'react'

import Protected from './../../Protected';
import Public from './../../Public';
import netlifyIdentity from 'netlify-identity-widget'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom'
  

  const user = netlifyIdentity.currentUser();
  console.log({user})
  
const netlifyAuth = {
    isAuthenticated: false,
    user: null,
    authenticate(callback) {
      this.isAuthenticated = true;
      netlifyIdentity.open();
      netlifyIdentity.on('login', user => {
        this.user = user;
        callback(user);
      });
    },
    signout(callback) {
      this.isAuthenticated = false;
      netlifyIdentity.logout();
      netlifyIdentity.on('logout', () => {
        this.user = null;
        callback();
      });
    }
  };

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            netlifyIdentity.currentUser() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

const AuthButton = withRouter(
    ({ history }) =>
        netlifyIdentity.currentUser() ? (
        <p>
          Welcome!{' '}
          <button
            onClick={() => {
              netlifyAuth.signout(() => history.push('/'));
            }}
          >
            Sign out
          </button>
        </p>
      ) : ( 
          
        <p>You are not logged in.</p>
      )
  );


  class Login extends React.Component {
    state = { redirectToReferrer: false };
    abortController = new this.abortController()

    login = () => {
      netlifyAuth.authenticate(() => {
        this.abortController.signal
        this.setState({ redirectToReferrer: true });
      });
    };

    componentWillUnmount() {
      this.abortController.abort()
    }
  
    render() {
      let { from } = this.props.location.state || { from: { pathname: '/' } };
      let { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) return <Redirect to={from} />;
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Log in</button>
        </div>
      );
    }
  }

export default function AuthExample() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/protected" component={Protected} />
        </div>
      </Router>
    );
  }