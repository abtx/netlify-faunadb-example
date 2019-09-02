import React from 'react'

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{ name: "", email: "", message: "", local:"" },
      page: 0
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

    console.log('nextSection')
    
    let newState = {
      ...this.state
    }
    newState.page = this.state.page + 1
    
    this.setState(newState)
    console.log(this.state)
    return
  }

  render() {
    const { name, email, message, local } = this.state
    
    return (
      <div>
         Page: {this.state.page}

    <form onSubmit={this.handleSubmit}>
            <div>
              <p>
                <label>
                  Local: <input type="text" name="local" value={local} onChange={this.handleChange} />
                </label>
              </p>
              <p>
                <label>
                  Your Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
                </label>
              </p>

              <button onClick={this.nextSection}>save and next</button>

            </div>
            <div>
              <p>
                <label>
                  Your Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
                </label>
              </p>
              <p>
                <label>
                  Message: <textarea name="message" value={message} onChange={this.handleChange} />
                </label>
              </p>
            </div>
          
        </form>


        <button onClick={this.handleSubmit}>Submit outside</button>
      </div>
    );
  }
}