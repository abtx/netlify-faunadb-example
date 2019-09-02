import React from 'react'

const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {form:{ name: "", email: "", message: "", local:"" }}
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    // console.log('try submit')
    fetch("https://zen-hamilton-2fec8a.netlify.com/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...this.state.form })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ form: {[e.target.name]: e.target.value }});

  nextPage = e => {
    this.page += 1
    console.log(this.page)
  }

  render() {
    const { name, email, message, local } = this.state
    
    return (
      <div>
        

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

              <button onClick={this.nextPage}>save and next</button>
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