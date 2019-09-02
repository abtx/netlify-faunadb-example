import React from 'react'

import Something from './SectionName'
import SomethingElse from './SectionTwo'


const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

let maxPages = 2

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{ name: "", email: "", message: "", local:"" },
      page: 1
    }
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch("https://zen-hamilton-2fec8a.netlify.com/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state.form })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    let newState = {
      ...this.state
    }
    newState.form[e.target.name]= e.target.value
    return this.setState(newState)
  }

  nextSection = e => {
    e.preventDefault()
    if(this.state.page >= maxPages) return
    let newState = {
      ...this.state
    }
    newState.page = this.state.page + 1
    return this.setState(newState)
  }

  previousSection = e => {
    e.preventDefault()
    if(this.state.page <= 1) return
    let newState = {
      ...this.state
    }
    newState.page = this.state.page - 1
    return this.setState(newState)
  }

  render() {
    const { name, email, message, local } = this.state
    
    return (
      <div>
         Page: {this.state.page}

        <form onSubmit={this.handleSubmit}>
            
            <div>
            {this.state.page === 1 && <Something callback={this.handleChange} local={local} name={name}/> }               
            </div>

            <div>
            {this.state.page === 2 && <SomethingElse callback={this.handleChange} email={email} message={message}/> } 
            </div>

            <button onClick={this.nextSection}>save and next</button>
            <button onClick={this.previousSection}>previous</button>

        </form>

        <button onClick={this.handleSubmit}>Submit outside</button>
      </div>
    );
  }
}