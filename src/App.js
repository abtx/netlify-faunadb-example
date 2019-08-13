import React, { Component } from 'react'
import AppHeader from './components/AppHeader'
import SettingsMenu from './components/SettingsMenu'

import './App.css'

import AuthExample from './components/AuthExample'
// import TestForm from './components/TestForm'

import netlifyIdentity from 'netlify-identity-widget';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }

  loggedIn() {
    const user = netlifyIdentity.currentUser();
    // console.log({ user });
    if(!user) {
      return
    }
    return (
      <div>
        <h3>Are we logged in?</h3>
        You are logged in as <b>{user.email}</b>
        {user.app_metadata.roles && <div><b>{user.app_metadata.roles[0]} </b></div>}

        {user.app_metadata.roles && <div><b> this is only if my user has a role </b></div>}
        
        <div>{user.id}</div> 
      </div>
    );
  }
  render() {
    return (
      <div className='app'>

        <AppHeader />

        <AuthExample />
        
        <SettingsMenu
          showMenu={this.state.showMenu}
          handleModalClose={this.closeModal}
          handleClearCompleted={this.clearCompleted}
        />
      </div>
    )
  }
}


