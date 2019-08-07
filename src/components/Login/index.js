import React from 'react'

import netlifyIdentity from 'netlify-identity-widget'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';

 let Public = function Public() {
    return <h3>Public</h3>;
  }

 let Protected = function Protected() {
    const user = netlifyIdentity.currentUser();
    console.log({ user });
    return (
      <div>
        <h3>Protected Page</h3>
        You are logged in as <b>{user.email}</b>
      </div>
    );
 }
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
  }

const AuthButton = withRouter(
    ({ history }) =>
      netlifyAuth.isAuthenticated ? (
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
  )

  function AuthExample() {
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
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          netlifyAuth.isAuthenticated ? (
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


  export default class Login extends React.Component {
    state = { redirectToReferrer: false };
  
    login = () => {
      netlifyAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };
  
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
